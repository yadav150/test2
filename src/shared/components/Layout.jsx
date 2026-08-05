import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  UserCog,
  ClipboardCheck,
  Wallet,
  Banknote,
  GraduationCap,
} from 'lucide-react'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/students', label: 'Students', icon: Users },
  { to: '/staff', label: 'Staff', icon: UserCog },
  { to: '/attendance', label: 'Attendance', icon: ClipboardCheck },
  { to: '/fees', label: 'Fees', icon: Wallet },
  { to: '/payroll', label: 'Payroll', icon: Banknote },
]

function Layout({ children }) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center gap-2 px-6 border-b border-gray-200">
          <GraduationCap className="w-7 h-7 text-primary-600" />
          <span className="font-semibold text-lg text-gray-900">
            School Admin
          </span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 text-xs text-gray-400">
          Phase 1 — Frontend only
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-8">
          <h1 className="text-lg font-semibold text-gray-800">
            School Management System
          </h1>
        </header>

        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  )
}

export default Layout
