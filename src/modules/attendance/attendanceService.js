// Attendance is stored per date, per class — matching the plan from
// our original data model: /attendance/{date}/records/{studentId}
// This keeps a day's attendance as one cheap, self-contained query
// rather than scanning all attendance ever recorded.

import { db } from '../../firebase/config.js'
import {
  collection,
  doc,
  getDocs,
  setDoc,
  writeBatch,
} from 'firebase/firestore'

// Fetch existing attendance records for a given date.
// Returns { studentId: status } for easy lookup in the UI.
export async function getAttendanceForDate(date) {
  const recordsRef = collection(db, 'attendance', date, 'records')
  const snapshot = await getDocs(recordsRef)
  const result = {}
  snapshot.docs.forEach((d) => {
    result[d.id] = d.data().status
  })
  return result
}

// Save a full day's attendance in one batch write — much cheaper
// and safer than writing each student's status as a separate
// request (30 students = 1 batch, not 30 round trips, and it
// either all succeeds or all fails together, no half-saved days).
export async function saveAttendance(date, classId, attendanceMap, markedBy) {
  const batch = writeBatch(db)
  Object.entries(attendanceMap).forEach(([studentId, status]) => {
    const ref = doc(db, 'attendance', date, 'records', studentId)
    batch.set(ref, { status, classId, markedBy, markedAt: new Date().toISOString() })
  })
  await batch.commit()
}
