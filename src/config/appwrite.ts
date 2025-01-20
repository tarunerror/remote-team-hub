import { Client, Account, Databases, Storage, Functions } from 'appwrite';

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const functions = new Functions(client);

export const COLLECTIONS = {
  USERS: 'users',
  TASKS: 'tasks',
  MESSAGES: 'messages',
  CALLS: 'calls',
};

export const DATABASES = {
  MAIN: 'main',
};

export default client;