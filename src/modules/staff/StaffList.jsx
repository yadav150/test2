import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, Pencil, Trash2 } from 'lucide-react'
import StaffForm from './StaffForm.jsx'
import { getStaff, deactivateStaffMember } from './staffService.js'

const roleColors = {
  Teacher: 'bg-primary-50 text-primary-700',
  Accountant: 'bg-violet-50 text-violet-700',
  Admin: 'bg-amber-50 text-amber-700',
}

function StaffList() {
  const [staff, setStaff] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingStaff, setEditingStaff] = useState(null)
  const navigate = useNavigate()

  const loadStaff = async () => {
    setLoading(true)
    const data = await getStaff()
    setStaff(data)
    setLoading(false)
  }

  useEffect(() => {
    loadStaff()
  }, [])

  const filtered = staff.filter((s) =>
    s.name?.toLowerCase().includes(search.toLowerCase())
  )

  const openAddForm = () => {
    setEditingStaff(null)
    setIsFormOpen(true)
  }

  const openEditForm = (member) => {
    setEditingStaff(member)
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setEditingStaff(null)
  }

  const handleFormSaved = () => {
    closeForm()
    loadStaff()
  }

  const handleDeactivate = async (e, staffId) => {
    e.stopPropagation()
    if (!confirm('Mark this staff member as inactive?')) return
    await deactivateStaffMember(staffId)
    loadStaff()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Staff</h2>
          <p className="text-sm text-gray-500 mt-1">
            {loading ? 'Loading...' : `${staff.length} staff members`}
          </p>
        </div>
        <button onClick={openAddForm} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Staff
        </button>
      </div>

      <div className="card p-4">
        <div className="relative max-w-sm">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search staff..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-9"
          />
        </div>
      </div>

      <div className="card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-sm text-gray-400">Loading staff...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-400">
            {staff.length === 0 ? 'No staff yet — add your first one.' : 'No matches found.'}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-left text-gray-500">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Role</th>
                <th className="px-5 py-3 font-medium">Subject / Charge</th>
                <th className="px-5 py-3 font-medium">Contact</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((s) => (
                <tr
                  key={s.id}
                  onClick={() => navigate(`/staff/${s.id}`)}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-5 py-3 font-medium text-gray-900">{s.name}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleColors[s.role] || 'bg-gray-50 text-gray-700'}`}>
                      {s.role}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-600">{s.subjectsOrCharge}</td>
                  <td className="px-5 py-3 text-gray-600">{s.contact}</td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                      {s.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          openEditForm(s)
                        }}
                        className="p-1.5 text-gray-400 hover:text-primary-600 rounded"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => handleDeactivate(e, s.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <StaffForm
        isOpen={isFormOpen}
        onClose={closeForm}
        onSaved={handleFormSaved}
        initialData={editingStaff}
      />
    </div>
  )
}

export default StaffList
