import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Phone, Briefcase, Wallet } from 'lucide-react'

// Placeholder — will be replaced by a Firestore doc lookup via staffId
const placeholderStaffMember = {
  id: '1',
  name: 'Meera Iyer',
  role: 'Teacher',
  subjectsOrCharge: 'Mathematics, Class 6-8',
  contact: '—',
  monthlySalary: '—',
  active: true,
}

const roleColors = {
  Teacher: 'bg-primary-50 text-primary-700',
  Accountant: 'bg-violet-50 text-violet-700',
  Admin: 'bg-amber-50 text-amber-700',
}

function StaffProfile() {
  const { staffId } = useParams()
  const staff = placeholderStaffMember // will use staffId to fetch real doc later

  return (
    <div className="space-y-6">
      <Link
        to="/staff"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Staff
      </Link>

      <div className="card p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary-50 text-primary-700 flex items-center justify-center text-xl font-semibold">
              {staff.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{staff.name}</h2>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${roleColors[staff.role] || 'bg-gray-50 text-gray-700'}`}>
                {staff.role}
              </span>
            </div>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
            {staff.active ? 'Active' : 'Inactive'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-gray-500" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Subject / Charge</p>
              <p className="text-sm font-medium text-gray-800">{staff.subjectsOrCharge}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center">
              <Phone className="w-4 h-4 text-gray-500" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Contact</p>
              <p className="text-sm font-medium text-gray-800">{staff.contact}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center">
              <Wallet className="w-4 h-4 text-gray-500" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Monthly Salary</p>
              <p className="text-sm font-medium text-gray-800">{staff.monthlySalary}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-sm font-medium text-gray-500 mb-3">Payroll History</h3>
        <p className="text-sm text-gray-400">
          Will populate once connected to payroll transactions.
        </p>
      </div>
    </div>
  )
}

export default StaffProfile
