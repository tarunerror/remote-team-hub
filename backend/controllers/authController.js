import jwt from 'jsonwebtoken';
import { appwriteService } from '../services/appwriteService.js';
import asyncHandler from 'express-async-handler';

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const session = await appwriteService.createEmailSession(email, password);
  
  if (session) {
    const token = jwt.sign({ userId: session.userId }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
    
    res.json({
      token,
      user: session.providerUid
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  
  const user = await appwriteService.createAccount(email, password, name);
  
  if (user) {
    const token = jwt.sign({ userId: user.$id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
    
    res.status(201).json({
      token,
      user: {
        id: user.$id,
        name: user.name,
        email: user.email
      }
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

export const logout = asyncHandler(async (req, res) => {
  await appwriteService.deleteCurrentSession();
  res.json({ message: 'Logged out successfully' });
});