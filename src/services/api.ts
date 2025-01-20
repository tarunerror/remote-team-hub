import axios from 'axios';
import { account, databases } from './appwrite';

const baseURL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (email: string, password: string) => {
    try {
      const session = await account.createEmailSession(email, password);
      const user = await account.get();
      return { token: session.$id, user };
    } catch (error) {
      throw new Error('Login failed');
    }
  },

  loginWithOAuth: async (provider: 'github' | 'google') => {
    try {
      return await account.createOAuth2Session(
        provider,
        `${window.location.origin}/auth/callback`,
        `${window.location.origin}/login`
      );
    } catch (error) {
      throw new Error(`${provider} login failed`);
    }
  },

  register: async (name: string, email: string, password: string) => {
    try {
      await account.create('unique()', email, password, name);
      return await authAPI.login(email, password);
    } catch (error) {
      throw new Error('Registration failed');
    }
  },

  logout: async () => {
    try {
      await account.deleteSession('current');
      localStorage.removeItem('token');
    } catch (error) {
      throw new Error('Logout failed');
    }
  },
};

export const tasksAPI = {
  getTasks: async () => {
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_PROJECT_ID,
        'tasks'
      );
      return response.documents;
    } catch (error) {
      throw new Error('Failed to fetch tasks');
    }
  },

  createTask: async (taskData: any) => {
    try {
      return await databases.createDocument(
        import.meta.env.VITE_APPWRITE_PROJECT_ID,
        'tasks',
        'unique()',
        taskData
      );
    } catch (error) {
      throw new Error('Failed to create task');
    }
  },

  updateTask: async (id: string, taskData: any) => {
    try {
      return await databases.updateDocument(
        import.meta.env.VITE_APPWRITE_PROJECT_ID,
        'tasks',
        id,
        taskData
      );
    } catch (error) {
      throw new Error('Failed to update task');
    }
  },

  deleteTask: async (id: string) => {
    try {
      await databases.deleteDocument(
        import.meta.env.VITE_APPWRITE_PROJECT_ID,
        'tasks',
        id
      );
      return true;
    } catch (error) {
      throw new Error('Failed to delete task');
    }
  },
};

export const chatAPI = {
  getMessages: async (channelId: string) => {
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_PROJECT_ID,
        'messages',
        [databases.orderDesc('$createdAt')]
      );
      return response.documents;
    } catch (error) {
      throw new Error('Failed to fetch messages');
    }
  },

  sendMessage: async (messageData: any) => {
    try {
      return await databases.createDocument(
        import.meta.env.VITE_APPWRITE_PROJECT_ID,
        'messages',
        'unique()',
        messageData
      );
    } catch (error) {
      throw new Error('Failed to send message');
    }
  },

  deleteMessage: async (id: string) => {
    try {
      await databases.deleteDocument(
        import.meta.env.VITE_APPWRITE_PROJECT_ID,
        'messages',
        id
      );
      return true;
    } catch (error) {
      throw new Error('Failed to delete message');
    }
  },
};

export const userAPI = {
  getProfile: async () => {
    try {
      return await account.get();
    } catch (error) {
      throw new Error('Failed to fetch profile');
    }
  },

  updateProfile: async (userData: any) => {
    try {
      return await account.updateName(userData.name);
    } catch (error) {
      throw new Error('Failed to update profile');
    }
  },

  getUsers: async () => {
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_PROJECT_ID,
        'users'
      );
      return response.documents;
    } catch (error) {
      throw new Error('Failed to fetch users');
    }
  },

  updateStatus: async (status: string) => {
    try {
      const user = await account.get();
      return await databases.updateDocument(
        import.meta.env.VITE_APPWRITE_PROJECT_ID,
        'users',
        user.$id,
        { status }
      );
    } catch (error) {
      throw new Error('Failed to update status');
    }
  },
};

export default api;