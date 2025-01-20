import { Client, Account, Databases } from 'appwrite';

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT || 'http://localhost:5000')
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID || 'default');

export const account = new Account(client);
export const databases = new Databases(client);

export default client;