import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Mail, Phone, GraduationCap, Calendar } from 'lucide-react'

// Placeholder — will be replaced by a Firestore doc lookup via studentId
const placeholderStudent = {
  id: '1',
  name: 'Aarav Sharma',
  class: '6',
  section: 'A',
  rollNo: 12,
  admissionDate: '2023-06-01',
  parentContact: '—',
  parentEmail: '—',
  active: true,
}

function StudentProfile() {
  const { studentId } = useParams()
  const student = placeholderStudent // will use studentId to fetch real doc later

  return (
    <div className="space-y-6">
      <Link
        to="/students"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Students
      </Link>

      <div className="card p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary-50 text-primary-700 flex items-center justify-center text-xl font-semibold">
              {student.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{student.name}</h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Class {student.class} - {student.section} · Roll No. {student.rollNo}
              </p>
            </div>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
            {student.active ? 'Active' : 'Inactive'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-gray-500" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Admission Date</p>
              <p className="text-sm font-medium text-gray-800">{student.admissionDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center">
              <Phone className="w-4 h-4 text-gray-500" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Parent Contact</p>
              <p className="text-sm font-medium text-gray-800">{student.parentContact}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center">
              <Mail className="w-4 h-4 text-gray-500" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Parent Email</p>
              <p className="text-sm font-medium text-gray-800">{student.parentEmail}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-sm font-medium text-gray-500 flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4" />
            Attendance Summary
          </h3>
          <p className="text-sm text-gray-400">
            Will populate once connected to attendance records.
          </p>
        </div>
        <div className="card p-6">
          <h3 className="text-sm font-medium text-gray-500 flex items-center gap-2 mb-3">
            Fee Ledger
          </h3>
          <p className="text-sm text-gray-400">
            Will populate once connected to fee transactions.
          </p>
        </div>
      </div>
    </div>
  )
}

export default StudentProfile
