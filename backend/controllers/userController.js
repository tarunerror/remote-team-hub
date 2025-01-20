import asyncHandler from 'express-async-handler';
import { appwriteService } from '../services/appwriteService.js';
import { User } from '../models/userModel.js';

export const getProfile = asyncHandler(async (req, res) => {
  const user = await appwriteService.getUser(req.user.id);
  if (user) {
    res.json(new User(user).toJSON());
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export const updateProfile = asyncHandler(async (req, res) => {
  const updatedUser = await appwriteService.updateUser(req.user.id, req.body);
  if (updatedUser) {
    res.json(new User(updatedUser).toJSON());
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export const getUsers = asyncHandler(async (req, res) => {
  const users = await appwriteService.listUsers();
  res.json(users.map(user => new User(user).toJSON()));
});

export const updateUserStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const updatedUser = await appwriteService.updateUserStatus(req.user.id, status);
  if (updatedUser) {
    res.json(new User(updatedUser).toJSON());
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});