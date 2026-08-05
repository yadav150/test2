/**
 * Computes the current balance for a given account from a list of
 * ledger transactions. This is the ONLY place balance math should
 * happen — both Fees and Payroll import this, so the logic never
 * drifts between modules.
 *
 * Convention:
 *   - direction: 'credit' → increases what the account owes
 *                (e.g. a fee charge, or a salary amount payable)
 *   - direction: 'debit'  → decreases what the account owes
 *                (e.g. a fee payment received, or a salary paid out)
 *
 * Balance = sum(credits) - sum(debits)
 *   > 0  → account still owes something (fee due / salary payable)
 *   = 0  → fully settled
 *   < 0  → overpaid / overpaid salary (rare, but should be visible,
 *          not hidden — a negative balance is a real signal, not a bug)
 *
 * @param {Array} transactions - full transaction list (will be filtered by accountId)
 * @param {string} accountId - the student or staff id to compute for
 * @returns {number} current balance
 */
export function computeBalance(transactions, accountId) {
  return transactions
    .filter((t) => t.accountId === accountId)
    .reduce((balance, t) => {
      if (t.direction === 'credit') return balance + t.amount
      if (t.direction === 'debit') return balance - t.amount
      return balance
    }, 0)
}

/**
 * Returns the transaction history for one account, most recent first.
 * Used by ledger detail views (student fee history, staff payroll history).
 */
export function getAccountHistory(transactions, accountId) {
  return transactions
    .filter((t) => t.accountId === accountId)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}
