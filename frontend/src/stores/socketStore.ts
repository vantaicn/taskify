import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

interface SocketState {
  socket: Socket | null;
  isConnected: boolean;
  connect: () => void;
}

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  isConnected: false,
  connect: () => {
    if (get().socket) return;
    const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000', {
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
      set({ isConnected: true });
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.id);
      set({ isConnected: false });
    });

    set({ socket });
  },
}));