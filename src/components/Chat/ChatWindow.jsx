import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { chatAPI } from '../../services/api';
import { setMessages, addMessage } from '../../store/slices/chatSlice';
import socket from '../../utils/socket';

const ChatWindow = () => {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      socket.auth = { token };
      socket.connect();
    }

    socket.on('connect', () => {
      setIsConnected(true);
      socket.emit('join_room', 'general');
    });

    socket.on('receive_message', (message) => {
      dispatch(addMessage(message));
    });

    return () => {
      socket.off('connect');
      socket.off('receive_message');
      socket.disconnect();
    };
  }, [dispatch]);

  const handleSendMessage = async (content) => {
    try {
      const messageData = {
        content,
        channelId: 'general',
        type: 'text',
        senderId: user.id,
      };

      const response = await chatAPI.sendMessage(messageData);
      socket.emit('send_message', {
        ...response,
        roomId: 'general',
      });
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] md:h-[600px] bg-white rounded-lg shadow-lg card-3d">
      <div className="p-4 border-b animate-gradient text-white rounded-t-lg">
        <h2 className="text-lg font-semibold">Team Chat</h2>
        <p className="text-sm opacity-80">
          {isConnected ? (
            <span className="flex items-center">
              <span className="h-2 w-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Connected
            </span>
          ) : (
            'Connecting...'
          )}
        </p>
      </div>
      <MessageList messages={messages} currentUser={user} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;