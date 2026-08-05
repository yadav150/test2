import { X } from 'lucide-react'

const roles = ['Teacher', 'Accountant', 'Admin']

function StaffForm({ isOpen, onClose, initialData = null }) {
  if (!isOpen) return null

  const isEdit = Boolean(initialData)

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {isEdit ? 'Edit Staff' : 'Add Staff'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              defaultValue={initialData?.name}
              className="input-field"
              placeholder="e.g. Meera Iyer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              defaultValue={initialData?.role || ''}
              className="input-field"
            >
              <option value="" disabled>Select role</option>
              {roles.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject / Charge
            </label>
            <input
              type="text"
              defaultValue={initialData?.subjectsOrCharge}
              className="input-field"
              placeholder="e.g. Mathematics, Class 6-8"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact
            </label>
            <input
              type="text"
              defaultValue={initialData?.contact}
              className="input-field"
              placeholder="Phone or email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Salary
            </label>
            <input
              type="number"
              defaultValue={initialData?.monthlySalary}
              className="input-field"
              placeholder="e.g. 25000"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {isEdit ? 'Save Changes' : 'Add Staff'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default StaffForm
