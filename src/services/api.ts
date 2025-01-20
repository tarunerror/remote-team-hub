import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  UserCredential
} from 'firebase/auth';
import { auth, db } from '../config/firebase';

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const authAPI = {
  login: async (email: string, password: string) => {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      
      // Get additional user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      const userData = userDoc.data();

      return {
        token,
        user: {
          id: userCredential.user.uid,
          email: userCredential.user.email,
          name: userData?.name || userCredential.user.displayName,
          role: userData?.role || 'user',
          status: 'online'
        }
      };
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Login failed');
    }
  },

  loginWithOAuth: async (provider: 'github' | 'google') => {
    try {
      const authProvider = provider === 'google' ? googleProvider : githubProvider;
      const userCredential: UserCredential = await signInWithPopup(auth, authProvider);
      const token = await userCredential.user.getIdToken();

      // Create or update user document in Firestore
      const userRef = doc(db, 'users', userCredential.user.uid);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          email: userCredential.user.email,
          name: userCredential.user.displayName,
          role: 'user',
          status: 'online',
          createdAt: serverTimestamp()
        });
      }

      return {
        token,
        user: {
          id: userCredential.user.uid,
          email: userCredential.user.email,
          name: userCredential.user.displayName,
          role: 'user',
          status: 'online'
        }
      };
    } catch (error: any) {
      console.error('OAuth login error:', error);
      throw new Error(error.message || `${provider} login failed`);
    }
  },

  register: async (name: string, email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();

      // Create user document in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name,
        email,
        role: 'user',
        status: 'online',
        createdAt: serverTimestamp()
      });

      return {
        token,
        user: {
          id: userCredential.user.uid,
          email,
          name,
          role: 'user',
          status: 'online'
        }
      };
    } catch (error: any) {
      console.error('Registration error:', error);
      throw new Error(error.message || 'Registration failed');
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('token');
    } catch (error: any) {
      console.error('Logout error:', error);
      throw new Error(error.message || 'Logout failed');
    }
  }
};

export const tasksAPI = {
  getTasks: async () => {
    try {
      const tasksRef = collection(db, 'tasks');
      const querySnapshot = await getDocs(tasksRef);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw new Error('Failed to fetch tasks');
    }
  },

  createTask: async (taskData: any) => {
    try {
      const docRef = await addDoc(collection(db, 'tasks'), {
        ...taskData,
        createdAt: serverTimestamp()
      });
      return { id: docRef.id, ...taskData };
    } catch (error) {
      throw new Error('Failed to create task');
    }
  },

  updateTask: async (id: string, taskData: any) => {
    try {
      const taskRef = doc(db, 'tasks', id);
      await updateDoc(taskRef, {
        ...taskData,
        updatedAt: serverTimestamp()
      });
      return { id, ...taskData };
    } catch (error) {
      throw new Error('Failed to update task');
    }
  },

  deleteTask: async (id: string) => {
    try {
      await deleteDoc(doc(db, 'tasks', id));
      return true;
    } catch (error) {
      throw new Error('Failed to delete task');
    }
  },
};

export const chatAPI = {
  getMessages: async (channelId: string) => {
    try {
      const messagesRef = collection(db, 'messages');
      const q = query(
        messagesRef,
        where('channelId', '==', channelId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw new Error('Failed to fetch messages');
    }
  },

  sendMessage: async (messageData: any) => {
    try {
      const docRef = await addDoc(collection(db, 'messages'), {
        ...messageData,
        createdAt: serverTimestamp()
      });
      return { id: docRef.id, ...messageData };
    } catch (error) {
      throw new Error('Failed to send message');
    }
  },

  deleteMessage: async (id: string) => {
    try {
      await deleteDoc(doc(db, 'messages', id));
      return true;
    } catch (error) {
      throw new Error('Failed to delete message');
    }
  },
};

export const userAPI = {
  getProfile: async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No user logged in');
      
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      return userDoc.data();
    } catch (error) {
      throw new Error('Failed to fetch profile');
    }
  },

  updateProfile: async (userData: any) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No user logged in');

      await updateDoc(doc(db, 'users', user.uid), {
        ...userData,
        updatedAt: serverTimestamp()
      });
      return userData;
    } catch (error) {
      throw new Error('Failed to update profile');
    }
  },

  getUsers: async () => {
    try {
      const usersRef = collection(db, 'users');
      const querySnapshot = await getDocs(usersRef);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw new Error('Failed to fetch users');
    }
  },

  updateStatus: async (status: string) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No user logged in');

      await updateDoc(doc(db, 'users', user.uid), {
        status,
        updatedAt: serverTimestamp()
      });
      return { status };
    } catch (error) {
      throw new Error('Failed to update status');
    }
  },
};

export default {
  auth: authAPI,
  tasks: tasksAPI,
  chat: chatAPI,
  users: userAPI,
};