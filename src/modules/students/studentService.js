// All Firestore access for students goes through this file.
// Components never call Firestore directly — they call these functions.

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

const studentsRef = collection(db, 'students')

// Fetch all students, ordered by name.
export async function getStudents() {
  const q = query(studentsRef, orderBy('name'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
}

// Fetch one student by id (used by StudentProfile).
export async function getStudent(studentId) {
  const ref = doc(db, 'students', studentId)
  const snapshot = await getDoc(ref)
  if (!snapshot.exists()) return null
  return { id: snapshot.id, ...snapshot.data() }
}

// Add a new student.
export async function addStudent(data) {
  return addDoc(studentsRef, {
    ...data,
    active: true,
    createdAt: new Date().toISOString(),
  })
}

// Update an existing student. Partial updates only — pass just the
// fields that changed, not the whole record.
export async function updateStudent(studentId, data) {
  const ref = doc(db, 'students', studentId)
  return updateDoc(ref, data)
}

// Soft delete — mark inactive rather than actually deleting the
// document. Preserves history (attendance/fee records still
// reference this studentId) instead of breaking those links.
export async function deactivateStudent(studentId) {
  const ref = doc(db, 'students', studentId)
  return updateDoc(ref, { active: false })
}
