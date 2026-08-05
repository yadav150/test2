// Firebase initialization — single source of truth for the app's
// Firebase connection. Every module's *Service.js file will import
// `db` from here, not initialize Firebase on its own.

import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC3RBe6AlCewKXkcVS4cDEXLDbClTvBgBY",
  authDomain: "mockly2-fe6bc.firebaseapp.com",
  projectId: "mockly2-fe6bc",
  storageBucket: "mockly2-fe6bc.firebasestorage.app",
  messagingSenderId: "535116640494",
  appId: "1:535116640494:web:4a02c00886fff2572503ff",
  measurementId: "G-VGL50BKX19",
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)

// Analytics only works in a browser context, not during build/SSR —
// guarding this avoids a crash if this file is ever imported server-side
export const analytics =
  typeof window !== 'undefined' ? getAnalytics(app) : null
