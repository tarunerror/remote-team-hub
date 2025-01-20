import { auth } from '../config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

export const api = {
  auth: {
    login: async (email, password) => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();
        return { user: userCredential.user, token };
      } catch (error) {
        throw new Error('Login failed');
      }
    },
    register: async (email, password, name) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();
        return { user: userCredential.user, token };
      } catch (error) {
        throw new Error('Registration failed');
      }
    },
    logout: async () => {
      try {
        await signOut(auth);
        return true;
      } catch (error) {
        throw new Error('Logout failed');
      }
    },
  },
};

export default api;