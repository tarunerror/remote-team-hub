import asyncHandler from 'express-async-handler';
import { appwriteService } from '../services/appwriteService.js';
import { Task } from '../models/taskModel.js';

export const getTasks = asyncHandler(async (req, res) => {
  const tasks = await appwriteService.listTasks();
  res.json(tasks.map(task => new Task(task).toJSON()));
});

export const createTask = asyncHandler(async (req, res) => {
  const taskData = {
    ...req.body,
    creatorId: req.user.id,
    createdAt: new Date().toISOString()
  };
  
  const task = await appwriteService.createTask(taskData);
  res.status(201).json(new Task(task).toJSON());
});

export const updateTask = asyncHandler(async (req, res) => {
  const task = await appwriteService.updateTask(req.params.id, req.body);
  
  if (task) {
    res.json(new Task(task).toJSON());
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
});

export const deleteTask = asyncHandler(async (req, res) => {
  const success = await appwriteService.deleteTask(req.params.id);
  
  if (success) {
    res.json({ message: 'Task deleted' });
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
});