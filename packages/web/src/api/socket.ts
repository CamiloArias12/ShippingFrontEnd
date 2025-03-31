import { io, Socket } from 'socket.io-client';
import { store } from '../store';
import { useEffect } from 'react'; // Make sure this import is included

let socket: Socket | null = null;

// Environment variable for the backend URL or fallback to localhost
const BACKEND_URL = import.meta.env.VITE_API_URL_SOCKET || 'http://localhost:8001';

export const initializeSocket = () => {
  if (socket) {
    socket.close();
  }

  const state = store.getState();
  const token = state.auth.token;

  socket = io(BACKEND_URL, {
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    timeout: 20000,
    auth: token ? { token } : undefined,
  });

  socket.on('connect', () => {
    console.log('Socket connected!', socket?.id);
  });

  socket.on('disconnect', (reason) => {
    console.log('Socket disconnected!', reason);
  });

  socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error);
  });

  return socket;
};

// Get the current socket instance or create one if it doesn't exist
export const getSocket = (): Socket => {
  if (!socket) {
    return initializeSocket();
  }
  return socket;
};

// Emit an event with payload
export const emitEvent = (event: string, payload?: any) => {
  const socketInstance = getSocket();
  socketInstance.emit(event, payload);
};

// Listen to a specific event
export const onEvent = (event: string, callback: (...args: any[]) => void) => {
  const socketInstance = getSocket();
  socketInstance.on(event, callback);
  
  // Return a function to remove the listener
  return () => {
    socketInstance.off(event, callback);
  };
};

// Subscribe to shipment updates for a specific shipment ID
export const subscribeToShipmentUpdates = (shipmentId: number | string, callback: (data: any) => void) => {
  const event = `shipment:${shipmentId}`;
  return onEvent(event, callback);
};

// React hook for shipment updates - making sure this is properly exported
export const useShipmentUpdates = (shipmentId: number | string, callback: (data: any) => void) => {
  useEffect(() => {
    // Subscribe to shipment updates
    const unsubscribe = subscribeToShipmentUpdates(shipmentId, callback);
    
    // Cleanup subscription when component unmounts
    return unsubscribe;
  }, [shipmentId, callback]);
};

// Disconnect socket
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
