import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, Pencil, Trash2 } from 'lucide-react'
import StudentForm from './StudentForm.jsx'

// Placeholder data — will be replaced by Firestore query in backend phase
const placeholderStudents = [
  { id: '1', name: 'Aarav Sharma', class: '6', section: 'A', rollNo: 12, parentContact: '—', active: true },
  { id: '2', name: 'Priya Nair', class: '7', section: 'B', rollNo: 5, parentContact: '—', active: true },
  { id: '3', name: 'Rohan Das', class: '6', section: 'A', rollNo: 20, parentContact: '—', active: true },
]

function StudentList() {
  const [search, setSearch] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const navigate = useNavigate()

  const filtered = placeholderStudents.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  )

  const openAddForm = () => {
    setEditingStudent(null)
    setIsFormOpen(true)
  }

  const openEditForm = (student) => {
    setEditingStudent(student)
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setEditingStudent(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Students</h2>
          <p className="text-sm text-gray-500 mt-1">
            {placeholderStudents.length} students enrolled
          </p>
        </div>
        <button onClick={openAddForm} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Student
        </button>
      </div>

      <div className="card p-4">
        <div className="relative max-w-sm">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search students..."
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
              <th className="px-5 py-3 font-medium">Class</th>
              <th className="px-5 py-3 font-medium">Section</th>
              <th className="px-5 py-3 font-medium">Roll No.</th>
              <th className="px-5 py-3 font-medium">Parent Contact</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((s) => (
              <tr
                key={s.id}
                onClick={() => navigate(`/students/${s.id}`)}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-5 py-3 font-medium text-gray-900">{s.name}</td>
                <td className="px-5 py-3 text-gray-600">{s.class}</td>
                <td className="px-5 py-3 text-gray-600">{s.section}</td>
                <td className="px-5 py-3 text-gray-600">{s.rollNo}</td>
                <td className="px-5 py-3 text-gray-600">{s.parentContact}</td>
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

      <StudentForm
        isOpen={isFormOpen}
        onClose={closeForm}
        initialData={editingStudent}
      />
    </div>
  )
}

export default StudentList
