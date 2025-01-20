import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message, Channel } from '../../types';

interface ChatState {
  messages: Message[];
  channels: Channel[];
  activeChannel: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  messages: [],
  channels: [],
  activeChannel: null,
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
      state.loading = false;
      state.error = null;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    setChannels: (state, action: PayloadAction<Channel[]>) => {
      state.channels = action.payload;
    },
    setActiveChannel: (state, action: PayloadAction<string>) => {
      state.activeChannel = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setMessages,
  addMessage,
  setChannels,
  setActiveChannel,
  setLoading,
  setError,
} = chatSlice.actions;
export default chatSlice.reducer;