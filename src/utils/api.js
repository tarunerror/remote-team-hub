import client from '../services/appwrite';
import { account, databases } from '../services/appwrite';

export const api = {
  auth: {
    login: async (email, password) => {
      try {
        return await account.createEmailSession(email, password);
      } catch (error) {
        throw new Error('Login failed');
      }
    },
    register: async (email, password, name) => {
      try {
        await account.create('unique()', email, password, name);
        return await account.createEmailSession(email, password);
      } catch (error) {
        throw new Error('Registration failed');
      }
    },
    logout: async () => {
      try {
        return await account.deleteSession('current');
      } catch (error) {
        throw new Error('Logout failed');
      }
    },
  },
  tasks: {
    // Task-related API calls will go here
  },
  chat: {
    // Chat-related API calls will go here
  },
};

export default api;