import { Server } from 'socket.io';
import logger from '../utils/logger.js';

class NotificationService {
  constructor() {
    this.io = null;
  }

  initialize(server) {
    this.io = new Server(server, {
      cors: {
        origin: process.env.NODE_ENV === 'production'
          ? 'https://your-production-domain.com'
          : 'http://localhost:3000',
        methods: ['GET', 'POST']
      }
    });

    this.io.on('connection', this.handleConnection.bind(this));
  }

  handleConnection(socket) {
    logger.info(`Client connected: ${socket.id}`);

    socket.on('join-room', (roomId) => {
      socket.join(roomId);
      logger.info(`Client ${socket.id} joined room: ${roomId}`);
    });

    socket.on('leave-room', (roomId) => {
      socket.leave(roomId);
      logger.info(`Client ${socket.id} left room: ${roomId}`);
    });

    socket.on('disconnect', () => {
      logger.info(`Client disconnected: ${socket.id}`);
    });
  }

  async sendNotification(userId, notification) {
    try {
      this.io.to(userId).emit('notification', notification);
      logger.info(`Notification sent to user ${userId}`);
      return true;
    } catch (error) {
      logger.error(`Error sending notification: ${error.message}`);
      return false;
    }
  }
}

export const notificationService = new NotificationService();