import { Client, Account, Databases } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const account = new Account(client);
const databases = new Databases(client);

class AppwriteService {
  async createEmailSession(email, password) {
    try {
      return await account.createEmailSession(email, password);
    } catch (error) {
      console.error('Appwrite service error:', error);
      return null;
    }
  }

  async createAccount(email, password, name) {
    try {
      return await account.create('unique()', email, password, name);
    } catch (error) {
      console.error('Appwrite service error:', error);
      return null;
    }
  }

  async deleteCurrentSession() {
    try {
      return await account.deleteSession('current');
    } catch (error) {
      console.error('Appwrite service error:', error);
      return false;
    }
  }

  // Task-related methods
  async listTasks() {
    try {
      const response = await databases.listDocuments(
        process.env.APPWRITE_DATABASE_ID,
        'tasks'
      );
      return response.documents;
    } catch (error) {
      console.error('Appwrite service error:', error);
      return [];
    }
  }

  async createTask(taskData) {
    try {
      return await databases.createDocument(
        process.env.APPWRITE_DATABASE_ID,
        'tasks',
        'unique()',
        taskData
      );
    } catch (error) {
      console.error('Appwrite service error:', error);
      return null;
    }
  }

  // Add other methods for tasks, messages, and users
}

export const appwriteService = new AppwriteService();