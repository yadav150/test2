import { Routes, Route } from 'react-router-dom'
import Dashboard from '../modules/dashboard/Dashboard.jsx'
import StudentList from '../modules/students/StudentList.jsx'
import StudentProfile from '../modules/students/StudentProfile.jsx'
import StaffList from '../modules/staff/StaffList.jsx'
import AttendanceGrid from '../modules/attendance/AttendanceGrid.jsx'
import FeeLedger from '../modules/fees/FeeLedger.jsx'
import PayrollLedger from '../modules/payroll/PayrollLedger.jsx'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/students" element={<StudentList />} />
      <Route path="/students/:studentId" element={<StudentProfile />} />
      <Route path="/staff" element={<StaffList />} />
      <Route path="/attendance" element={<AttendanceGrid />} />
      <Route path="/fees" element={<FeeLedger />} />
      <Route path="/payroll" element={<PayrollLedger />} />
    </Routes>
  )
}

export default AppRoutes
