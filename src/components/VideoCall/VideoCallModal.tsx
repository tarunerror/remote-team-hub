import React, { useEffect, useRef, useState } from 'react';
import { videoCallService } from '../../services/VideoCallService';
import { Mic, MicOff, Video, VideoOff, PhoneOff } from 'lucide-react';

interface VideoCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  channelId: string;
  userId: string;
}

const VideoCallModal: React.FC<VideoCallModalProps> = ({
  isOpen,
  onClose,
  channelId,
  userId,
}) => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const localVideoRef = useRef<HTMLDivElement>(null);
  const remoteVideoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      initializeCall();
    }

    return () => {
      if (isOpen) {
        videoCallService.leaveCall();
      }
    };
  }, [isOpen]);

  const initializeCall = async () => {
    try {
      const { localAudioTrack, localVideoTrack } = await videoCallService.initializeCall(
        channelId,
        userId
      );

      if (localVideoRef.current && localVideoTrack) {
        localVideoTrack.play(localVideoRef.current);
      }

      videoCallService.onUserJoined((user) => {
        // Handle remote user joined
      });

      videoCallService.onUserLeft((user) => {
        // Handle remote user left
      });
    } catch (error) {
      console.error('Failed to initialize call:', error);
    }
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    // Implement audio toggle logic
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    // Implement video toggle logic
  };

  const endCall = async () => {
    await videoCallService.leaveCall();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl p-4">
        <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4">
          <div ref={remoteVideoRef} className="absolute inset-0" />
          <div
            ref={localVideoRef}
            className="absolute bottom-4 right-4 w-48 aspect-video bg-gray-800 rounded-lg overflow-hidden"
          />
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={toggleAudio}
            className={`p-4 rounded-full ${
              isAudioEnabled ? 'bg-blue-500' : 'bg-red-500'
            } text-white`}
          >
            {isAudioEnabled ? <Mic /> : <MicOff />}
          </button>
          <button
            onClick={toggleVideo}
            className={`p-4 rounded-full ${
              isVideoEnabled ? 'bg-blue-500' : 'bg-red-500'
            } text-white`}
          >
            {isVideoEnabled ? <Video /> : <VideoOff />}
          </button>
          <button
            onClick={endCall}
            className="p-4 rounded-full bg-red-500 text-white"
          >
            <PhoneOff />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCallModal;