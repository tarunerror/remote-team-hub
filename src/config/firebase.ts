import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const isDevelopment = import.meta.env.DEV;

// In development, use default config if env vars aren't set
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || (isDevelopment ? 'demo-key' : undefined),
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || (isDevelopment ? 'demo-project.firebaseapp.com' : undefined),
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || (isDevelopment ? 'demo-project' : undefined),
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || (isDevelopment ? 'demo-project.appspot.com' : undefined),
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || (isDevelopment ? '123456789' : undefined),
  appId: import.meta.env.VITE_FIREBASE_APP_ID || (isDevelopment ? '1:123456789:web:abcdef' : undefined)
};

// Validate config in production
if (!isDevelopment) {
  const missingVars = Object.entries(firebaseConfig)
    .filter(([_, value]) => value === undefined)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required Firebase configuration: ${missingVars.join(', ')}`
    );
  }
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
export default app;