import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Mail, Phone, GraduationCap, Calendar } from 'lucide-react'
import { getStudent } from './studentService.js'
import { db } from '../../firebase/config.js'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { getAccountHistory, computeBalance } from '../../shared/ledger/computeBalance.js'

function StudentProfile() {
  const { studentId } = useParams()
  const [student, setStudent] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const studentData = await getStudent(studentId)
      setStudent(studentData)

      // Fetch this student's fee transactions from the shared ledger
      const txRef = collection(db, 'transactions')
      const q = query(
        txRef,
        where('accountId', '==', studentId),
        where('accountType', '==', 'student')
      )
      const snapshot = await getDocs(q)
      setTransactions(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })))

      setLoading(false)
    }
    load()
  }, [studentId])

  if (loading) {
    return <div className="text-sm text-gray-400">Loading student...</div>
  }

  if (!student) {
    return (
      <div className="space-y-4">
        <Link to="/students" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
          <ArrowLeft className="w-4 h-4" />
          Back to Students
        </Link>
        <p className="text-sm text-gray-500">Student not found.</p>
      </div>
    )
  }

  const history = getAccountHistory(transactions, studentId)
  const balance = computeBalance(transactions, studentId)

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
              {student.name?.split(' ').map((n) => n[0]).join('')}
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
              <p className="text-sm font-medium text-gray-800">{student.createdAt?.split('T')[0] || '—'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center">
              <Phone className="w-4 h-4 text-gray-500" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Parent Contact</p>
              <p className="text-sm font-medium text-gray-800">{student.parentContact || '—'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center">
              <Mail className="w-4 h-4 text-gray-500" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Parent Email</p>
              <p className="text-sm font-medium text-gray-800">{student.parentEmail || '—'}</p>
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
            Will populate once Attendance module is connected.
          </p>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-500">Fee Ledger</h3>
            <span className="text-sm font-semibold text-gray-900">
              ₹{balance.toLocaleString('en-IN')} due
            </span>
          </div>
          {history.length === 0 ? (
            <p className="text-sm text-gray-400">No transactions yet.</p>
          ) : (
            <div className="space-y-2">
              {history.map((t) => (
                <div key={t.id} className="flex items-center justify-between text-sm py-1.5 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-gray-700">{t.type?.replace('_', ' ')}</p>
                    <p className="text-xs text-gray-400">{t.date}</p>
                  </div>
                  <span className={t.direction === 'credit' ? 'text-amber-600' : 'text-emerald-600'}>
                    {t.direction === 'credit' ? '+' : '−'}₹{t.amount?.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StudentProfile
