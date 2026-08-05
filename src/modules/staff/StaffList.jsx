import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, Pencil, Trash2 } from 'lucide-react'
import StaffForm from './StaffForm.jsx'

// Placeholder data — will be replaced by Firestore query in backend phase
const placeholderStaff = [
  { id: '1', name: 'Meera Iyer', role: 'Teacher', subjectsOrCharge: 'Mathematics, Class 6-8', contact: '—', active: true },
  { id: '2', name: 'Sanjay Verma', role: 'Accountant', subjectsOrCharge: 'Finance Office', contact: '—', active: true },
  { id: '3', name: 'Anita Rao', role: 'Admin', subjectsOrCharge: 'Front Office', contact: '—', active: true },
]

const roleColors = {
  Teacher: 'bg-primary-50 text-primary-700',
  Accountant: 'bg-violet-50 text-violet-700',
  Admin: 'bg-amber-50 text-amber-700',
}

function StaffList() {
  const [search, setSearch] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingStaff, setEditingStaff] = useState(null)
  const navigate = useNavigate()

  const filtered = placeholderStaff.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  )

  const openAddForm = () => {
    setEditingStaff(null)
    setIsFormOpen(true)
  }

  const openEditForm = (staff) => {
    setEditingStaff(staff)
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setEditingStaff(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Staff</h2>
          <p className="text-sm text-gray-500 mt-1">
            {placeholderStaff.length} staff members
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
                      onClick={(e) => e.stopPropagation()}
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
      </div>

      <StaffForm
        isOpen={isFormOpen}
        onClose={closeForm}
        initialData={editingStaff}
      />
    </div>
  )
}

export default StaffList
