// All Firestore access for staff goes through this file — same
// pattern as studentService.js.

import { db } from '../../firebase/config.js'
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  query,
  orderBy,
} from 'firebase/firestore'

const staffRef = collection(db, 'staff')

// Fetch all staff, ordered by name.
export async function getStaff() {
  const q = query(staffRef, orderBy('name'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
}

// Fetch one staff member by id (used by StaffProfile).
export async function getStaffMember(staffId) {
  const ref = doc(db, 'staff', staffId)
  const snapshot = await getDoc(ref)
  if (!snapshot.exists()) return null
  return { id: snapshot.id, ...snapshot.data() }
}

// Add a new staff member.
export async function addStaffMember(data) {
  return addDoc(staffRef, {
    ...data,
    active: true,
    createdAt: new Date().toISOString(),
  })
}

// Update an existing staff member. Partial updates only.
export async function updateStaffMember(staffId, data) {
  const ref = doc(db, 'staff', staffId)
  return updateDoc(ref, data)
}

// Soft delete — same reasoning as students: payroll history
// references staffId, so we preserve the record rather than
// deleting it outright.
export async function deactivateStaffMember(staffId) {
  const ref = doc(db, 'staff', staffId)
  return updateDoc(ref, { active: false })
}
