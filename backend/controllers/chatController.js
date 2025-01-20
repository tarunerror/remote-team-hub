import asyncHandler from 'express-async-handler';
import { appwriteService } from '../services/appwriteService.js';
import { Message } from '../models/messageModel.js';

export const getMessages = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  const messages = await appwriteService.listMessages(channelId);
  res.json(messages.map(message => new Message(message).toJSON()));
});

export const sendMessage = asyncHandler(async (req, res) => {
  const { content, channelId, type = 'text', parentId } = req.body;
  
  const messageData = {
    content,
    channelId,
    type,
    parentId,
    senderId: req.user.id,
    createdAt: new Date().toISOString()
  };
  
  const message = await appwriteService.createMessage(messageData);
  res.status(201).json(new Message(message).toJSON());
});

export const deleteMessage = asyncHandler(async (req, res) => {
  const success = await appwriteService.deleteMessage(req.params.id);
  
  if (success) {
    res.json({ message: 'Message deleted' });
  } else {
    res.status(404);
    throw new Error('Message not found');
  }
});