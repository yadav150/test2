import { Users, UserCog, ClipboardCheck, Wallet } from 'lucide-react'

const stats = [
  { label: 'Total Students', value: '—', icon: Users, color: 'text-primary-600 bg-primary-50' },
  { label: 'Total Staff', value: '—', icon: UserCog, color: 'text-emerald-600 bg-emerald-50' },
  { label: "Today's Attendance", value: '—', icon: ClipboardCheck, color: 'text-amber-600 bg-amber-50' },
  { label: 'Fees Collected (MTD)', value: '—', icon: Wallet, color: 'text-violet-600 bg-violet-50' },
]

function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>
        <p className="text-sm text-gray-500 mt-1">
          Overview will populate once connected to Firestore.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="card p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  {value}
                </p>
              </div>
              <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card p-6">
        <h3 className="text-sm font-medium text-gray-500">Recent Activity</h3>
        <p className="text-sm text-gray-400 mt-4">
          No activity yet — this will show recent attendance, fee, and
          payroll entries once modules are connected to data.
        </p>
      </div>
    </div>
  )
}

export default Dashboard
