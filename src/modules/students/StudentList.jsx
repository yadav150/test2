import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, Pencil, Trash2 } from 'lucide-react'
import StudentForm from './StudentForm.jsx'
import { getStudents, deactivateStudent } from './studentService.js'

function StudentList() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const navigate = useNavigate()

  const loadStudents = async () => {
    setLoading(true)
    const data = await getStudents()
    setStudents(data)
    setLoading(false)
  }

  useEffect(() => {
    loadStudents()
  }, [])

  const filtered = students.filter((s) =>
    s.name?.toLowerCase().includes(search.toLowerCase())
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

  // Called by StudentForm after a successful add/edit, so the list
  // reflects the change without a manual page refresh.
  const handleFormSaved = () => {
    closeForm()
    loadStudents()
  }

  const handleDeactivate = async (e, studentId) => {
    e.stopPropagation()
    if (!confirm('Mark this student as inactive?')) return
    await deactivateStudent(studentId)
    loadStudents()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Students</h2>
          <p className="text-sm text-gray-500 mt-1">
            {loading ? 'Loading...' : `${students.length} students enrolled`}
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
        {loading ? (
          <div className="p-8 text-center text-sm text-gray-400">Loading students...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-400">
            {students.length === 0 ? 'No students yet — add your first one.' : 'No matches found.'}
          </div>
        ) : (
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

      <StudentForm
        isOpen={isFormOpen}
        onClose={closeForm}
        onSaved={handleFormSaved}
        initialData={editingStudent}
      />
    </div>
  )
}

export default StudentList
