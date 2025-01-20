import AgoraRTC, {
  IAgoraRTCClient,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from 'agora-rtc-sdk-ng';
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

class VideoCallService {
  private client: IAgoraRTCClient;
  private localAudioTrack: IMicrophoneAudioTrack | null = null;
  private localVideoTrack: ICameraVideoTrack | null = null;

  constructor() {
    this.client = AgoraRTC.createClient({
      mode: 'rtc',
      codec: 'vp8',
    });
  }

  async initializeCall(channelId: string, userId: string) {
    try {
      // Get token from your token server
      const token = await this.getAgoraToken(channelId, userId);
      
      await this.client.join(
        import.meta.env.VITE_AGORA_APP_ID,
        channelId,
        token,
        userId
      );

      this.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      this.localVideoTrack = await AgoraRTC.createCameraVideoTrack();

      await this.client.publish([this.localAudioTrack, this.localVideoTrack]);

      // Save call details to Firebase
      await addDoc(collection(db, 'calls'), {
        channelId,
        userId,
        startTime: new Date().toISOString(),
        status: 'active',
      });

      return {
        localAudioTrack: this.localAudioTrack,
        localVideoTrack: this.localVideoTrack,
      };
    } catch (error) {
      console.error('Failed to initialize call:', error);
      throw error;
    }
  }

  async leaveCall() {
    try {
      this.localAudioTrack?.close();
      this.localVideoTrack?.close();
      await this.client.leave();
    } catch (error) {
      console.error('Failed to leave call:', error);
      throw error;
    }
  }

  private async getAgoraToken(channelId: string, userId: string): Promise<string> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/agora/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ channelId, userId }),
    });
    
    const data = await response.json();
    return data.token;
  }

  onUserJoined(callback: (user: any) => void) {
    this.client.on('user-joined', callback);
  }

  onUserLeft(callback: (user: any) => void) {
    this.client.on('user-left', callback);
  }
}

export const videoCallService = new VideoCallService();