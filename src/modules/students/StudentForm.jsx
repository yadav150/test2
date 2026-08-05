import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { addStudent, updateStudent } from './studentService.js'

const emptyForm = {
  name: '',
  class: '',
  section: '',
  rollNo: '',
  parentContact: '',
}

function StudentForm({ isOpen, onClose, onSaved, initialData = null }) {
  const [formData, setFormData] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const isEdit = Boolean(initialData)

  // Reset form contents whenever the modal opens, using initialData
  // if editing or a blank form if adding. Runs on isOpen/initialData
  // change rather than just once, since the same component instance
  // is reused for every open (Add then Edit then Add again, etc.)
  useEffect(() => {
    if (isOpen) {
      setFormData(
        initialData
          ? {
              name: initialData.name || '',
              class: initialData.class || '',
              section: initialData.section || '',
              rollNo: initialData.rollNo || '',
              parentContact: initialData.parentContact || '',
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
    setSaving(true)
    setError('')
    try {
      if (isEdit) {
        await updateStudent(initialData.id, formData)
      } else {
        await addStudent(formData)
      }
      onSaved()
    } catch (err) {
      setError('Something went wrong saving this student. Please try again.')
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
            {isEdit ? 'Edit Student' : 'Add Student'}
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
              placeholder="e.g. Aarav Sharma"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Class
              </label>
              <input
                type="text"
                value={formData.class}
                onChange={handleChange('class')}
                className="input-field"
                placeholder="e.g. 6"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section
              </label>
              <input
                type="text"
                value={formData.section}
                onChange={handleChange('section')}
                className="input-field"
                placeholder="e.g. A"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Roll No.
            </label>
            <input
              type="number"
              value={formData.rollNo}
              onChange={handleChange('rollNo')}
              className="input-field"
              placeholder="e.g. 12"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parent Contact
            </label>
            <input
              type="text"
              value={formData.parentContact}
              onChange={handleChange('parentContact')}
              className="input-field"
              placeholder="Phone or email"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary" disabled={saving}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default StudentForm
