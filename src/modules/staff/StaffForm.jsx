import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { addStaffMember, updateStaffMember } from './staffService.js'

const roles = ['Teacher', 'Accountant', 'Admin']

const emptyForm = {
  name: '',
  role: '',
  subjectsOrCharge: '',
  contact: '',
  monthlySalary: '',
}

function StaffForm({ isOpen, onClose, onSaved, initialData = null }) {
  const [formData, setFormData] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const isEdit = Boolean(initialData)

  useEffect(() => {
    if (isOpen) {
      setFormData(
        initialData
          ? {
              name: initialData.name || '',
              role: initialData.role || '',
              subjectsOrCharge: initialData.subjectsOrCharge || '',
              contact: initialData.contact || '',
              monthlySalary: initialData.monthlySalary || '',
            }
          : emptyForm
      )
      setError('')
    }
  }, [isOpen, initialData])

  if (!isOpen) return null

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      setError('Name is required.')
      return
    }
    if (!formData.role) {
      setError('Please select a role.')
      return
    }
    setSaving(true)
    setError('')
    try {
      if (isEdit) {
        await updateStaffMember(initialData.id, formData)
      } else {
        await addStaffMember(formData)
      }
      onSaved()
    } catch (err) {
      setError('Something went wrong saving this staff member. Please try again.')
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {isEdit ? 'Edit Staff' : 'Add Staff'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-700 text-sm px-3 py-2 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={handleChange('name')}
              className="input-field"
              placeholder="e.g. Meera Iyer"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              value={formData.role}
              onChange={handleChange('role')}
              className="input-field"
              required
            >
              <option value="" disabled>Select role</option>
              {roles.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject / Charge
            </label>
            <input
              type="text"
              value={formData.subjectsOrCharge}
              onChange={handleChange('subjectsOrCharge')}
              className="input-field"
              placeholder="e.g. Mathematics, Class 6-8"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact
            </label>
            <input
              type="text"
              value={formData.contact}
              onChange={handleChange('contact')}
              className="input-field"
              placeholder="Phone or email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Salary
            </label>
            <input
              type="number"
              value={formData.monthlySalary}
              onChange={handleChange('monthlySalary')}
              className="input-field"
              placeholder="e.g. 25000"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary" disabled={saving}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Staff'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default StaffForm
