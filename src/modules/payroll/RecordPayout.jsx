import { useState } from 'react'
import { X } from 'lucide-react'
import { computeBalance } from '../../shared/ledger/computeBalance.js'

function RecordPayout({ isOpen, onClose, staff, transactions = [] }) {
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')

  if (!isOpen || !staff) return null

  const currentBalance = computeBalance(transactions, staff.id)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Backend phase: this will append a new transaction doc to Firestore
    //   { accountId: staff.id, type: 'salary_payout', amount: Number(amount),
    //     direction: 'debit', date: today, note, createdBy: currentUser }
    // Same rule as fees: append-only, never mutate a stored balance.
    setAmount('')
    setNote('')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Record Payout</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 pt-5">
          <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">{staff.name}</p>
              <p className="text-xs text-gray-500">{staff.role}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Balance Payable</p>
              <p className="text-base font-semibold text-gray-900">
                ₹{currentBalance.toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount Paid
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="input-field pl-7"
                placeholder="0"
                required
                min="1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Note (optional)
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="input-field"
              placeholder="e.g. July salary, bank transfer"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Record Payout
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RecordPayout
