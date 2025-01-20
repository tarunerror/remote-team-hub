import React from 'react';
import { format } from 'date-fns';

const MessageList = ({ messages, currentUser }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => {
        const isOwnMessage = message.senderId === currentUser?.id;

        return (
          <div
            key={message.id}
            className={`flex flex-col ${
              isOwnMessage ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`max-w-[70%] perspective-container ${
                isOwnMessage
                  ? 'animate-gradient text-white rounded-l-lg rounded-tr-lg card-3d'
                  : 'bg-gray-100 text-gray-900 rounded-r-lg rounded-tl-lg card-3d'
              } px-4 py-2 animate-float`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
            <span className="text-xs text-gray-500 mt-1">
              {format(new Date(message.createdAt), 'HH:mm')}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;