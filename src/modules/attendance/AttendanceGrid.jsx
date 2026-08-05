import { useState } from 'react'
import { Calendar, Check, X as XIcon, Clock, UserX } from 'lucide-react'

// Placeholder data — will be replaced by Firestore query in backend phase
const placeholderStudents = [
  { id: '1', name: 'Aarav Sharma', class: '6', section: 'A', rollNo: 12 },
  { id: '2', name: 'Priya Nair', class: '6', section: 'A', rollNo: 5 },
  { id: '3', name: 'Rohan Das', class: '6', section: 'A', rollNo: 20 },
]

const statusOptions = [
  { value: 'present', label: 'Present', icon: Check, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { value: 'absent', label: 'Absent', icon: XIcon, color: 'bg-red-50 text-red-700 border-red-200' },
  { value: 'late', label: 'Late', icon: Clock, color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { value: 'leave', label: 'Leave', icon: UserX, color: 'bg-gray-100 text-gray-600 border-gray-200' },
]

function AttendanceGrid() {
  const today = new Date().toISOString().split('T')[0]
  const [selectedDate, setSelectedDate] = useState(today)
  const [selectedClass, setSelectedClass] = useState('6-A')

  // Local-only state for now — { studentId: status }
  const [attendance, setAttendance] = useState({})

  const setStatus = (studentId, status) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }))
  }

  const markedCount = Object.keys(attendance).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Attendance</h2>
          <p className="text-sm text-gray-500 mt-1">
            {markedCount} of {placeholderStudents.length} marked
          </p>
        </div>
        <button className="btn-primary">Save Attendance</button>
      </div>

      <div className="card p-4 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="input-field w-auto"
          />
        </div>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="input-field w-auto"
        >
          <option value="6-A">Class 6 - A</option>
          <option value="7-B">Class 7 - B</option>
        </select>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-left text-gray-500">
              <th className="px-5 py-3 font-medium">Roll No.</th>
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {placeholderStudents.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-5 py-3 text-gray-600">{s.rollNo}</td>
                <td className="px-5 py-3 font-medium text-gray-900">{s.name}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    {statusOptions.map(({ value, label, icon: Icon, color }) => {
                      const isSelected = attendance[s.id] === value
                      return (
                        <button
                          key={value}
                          onClick={() => setStatus(s.id, value)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                            isSelected
                              ? color
                              : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          {label}
                        </button>
                      )
                    })}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AttendanceGrid
