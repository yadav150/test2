import { useState } from 'react'
import { Search, Plus } from 'lucide-react'
import RecordPayment from './RecordPayment.jsx'
import { computeBalance } from '../../shared/ledger/computeBalance.js'

// Placeholder students — same shape as Students module
const placeholderStudents = [
  { id: '1', name: 'Aarav Sharma', class: '6', section: 'A', rollNo: 12 },
  { id: '2', name: 'Priya Nair', class: '7', section: 'B', rollNo: 5 },
  { id: '3', name: 'Rohan Das', class: '6', section: 'A', rollNo: 20 },
]

// Placeholder transactions — this is the ledger. Each entry is immutable.
// accountType/accountId link back to a student; direction is credit (fee due)
// or debit (payment received) against that student's account.
const placeholderTransactions = [
  { id: 't1', accountId: '1', type: 'fee_due', amount: 15000, direction: 'credit', date: '2026-04-01' },
  { id: 't2', accountId: '1', type: 'fee_payment', amount: 10000, direction: 'debit', date: '2026-05-10' },
  { id: 't3', accountId: '2', type: 'fee_due', amount: 18000, direction: 'credit', date: '2026-04-01' },
  { id: 't4', accountId: '2', type: 'fee_payment', amount: 18000, direction: 'debit', date: '2026-06-02' },
  { id: 't5', accountId: '3', type: 'fee_due', amount: 15000, direction: 'credit', date: '2026-04-01' },
]

function FeeLedger() {
  const [search, setSearch] = useState('')
  const [isPaymentOpen, setIsPaymentOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)

  const rows = placeholderStudents
    .map((s) => ({
      ...s,
      balance: computeBalance(placeholderTransactions, s.id),
    }))
    .filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))

  const openPaymentForm = (student) => {
    setSelectedStudent(student)
    setIsPaymentOpen(true)
  }

  const closePaymentForm = () => {
    setIsPaymentOpen(false)
    setSelectedStudent(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Fees</h2>
        <p className="text-sm text-gray-500 mt-1">
          Outstanding balances across all students
        </p>
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
              <th className="px-5 py-3 font-medium">Balance Due</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-5 py-3 font-medium text-gray-900">{s.name}</td>
                <td className="px-5 py-3 text-gray-600">{s.class} - {s.section}</td>
                <td className="px-5 py-3 font-medium text-gray-900">
                  ₹{s.balance.toLocaleString('en-IN')}
                </td>
                <td className="px-5 py-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    s.balance > 0
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-emerald-50 text-emerald-700'
                  }`}>
                    {s.balance > 0 ? 'Due' : 'Cleared'}
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <button
                    onClick={() => openPaymentForm(s)}
                    className="inline-flex items-center gap-1.5 text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Record Payment
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <RecordPayment
        isOpen={isPaymentOpen}
        onClose={closePaymentForm}
        student={selectedStudent}
        transactions={placeholderTransactions}
      />
    </div>
  )
}

export default FeeLedger
