import { useState } from 'react'
import { Search, Plus } from 'lucide-react'
import RecordPayout from './RecordPayout.jsx'
import { computeBalance } from '../../shared/ledger/computeBalance.js'

// Placeholder staff — same shape as Staff module
const placeholderStaff = [
  { id: '1', name: 'Meera Iyer', role: 'Teacher' },
  { id: '2', name: 'Sanjay Verma', role: 'Accountant' },
  { id: '3', name: 'Anita Rao', role: 'Admin' },
]

// Placeholder transactions — same ledger pattern as Fees.
// credit = salary payable (owed to staff), debit = salary paid out.
const placeholderTransactions = [
  { id: 'p1', accountId: '1', type: 'salary_payable', amount: 25000, direction: 'credit', date: '2026-07-01' },
  { id: 'p2', accountId: '1', type: 'salary_payout', amount: 25000, direction: 'debit', date: '2026-07-05' },
  { id: 'p3', accountId: '2', type: 'salary_payable', amount: 22000, direction: 'credit', date: '2026-07-01' },
  { id: 'p4', accountId: '3', type: 'salary_payable', amount: 18000, direction: 'credit', date: '2026-07-01' },
]

const roleColors = {
  Teacher: 'bg-primary-50 text-primary-700',
  Accountant: 'bg-violet-50 text-violet-700',
  Admin: 'bg-amber-50 text-amber-700',
}

function PayrollLedger() {
  const [search, setSearch] = useState('')
  const [isPayoutOpen, setIsPayoutOpen] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState(null)

  const rows = placeholderStaff
    .map((s) => ({
      ...s,
      balance: computeBalance(placeholderTransactions, s.id),
    }))
    .filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))

  const openPayoutForm = (staff) => {
    setSelectedStaff(staff)
    setIsPayoutOpen(true)
  }

  const closePayoutForm = () => {
    setIsPayoutOpen(false)
    setSelectedStaff(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Payroll</h2>
        <p className="text-sm text-gray-500 mt-1">
          Outstanding salary balances across all staff
        </p>
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
              <th className="px-5 py-3 font-medium">Balance Payable</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-5 py-3 font-medium text-gray-900">{s.name}</td>
                <td className="px-5 py-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleColors[s.role] || 'bg-gray-50 text-gray-700'}`}>
                    {s.role}
                  </span>
                </td>
                <td className="px-5 py-3 font-medium text-gray-900">
                  ₹{s.balance.toLocaleString('en-IN')}
                </td>
                <td className="px-5 py-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    s.balance > 0
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-emerald-50 text-emerald-700'
                  }`}>
                    {s.balance > 0 ? 'Payable' : 'Cleared'}
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <button
                    onClick={() => openPayoutForm(s)}
                    className="inline-flex items-center gap-1.5 text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Record Payout
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <RecordPayout
        isOpen={isPayoutOpen}
        onClose={closePayoutForm}
        staff={selectedStaff}
        transactions={placeholderTransactions}
      />
    </div>
  )
}

export default PayrollLedger
