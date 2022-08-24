import { io, Socket } from 'socket.io-client';
import { RootState, useAppSelector } from '@/redux';
import React, {
  createContext,
  useContext,
  FC,
  useEffect,
  useState,
  useMemo,
} from 'react';

const SocketContext = createContext<Socket | string>(
  'No permission to use this context',
);

interface ISocketContext {
  children: React.ReactNode;
}

export const SocketProvider: FC<ISocketContext> = ({ children }) => {
  const url = process.env.NEXT_PUBLIC_SOCKET_URL ?? '';
  const userId = useAppSelector(
    (state: RootState) => state.userSlice.inforUser.id,
  );
  const [socket, setSocket] = useState<Socket | string>(
    'No permission to use this context',
  );

  // Connect Socket
  useMemo(() => {
    if (userId) {
      setSocket(
        io(url, {
          query: {
            userId,
          },
        }),
      );
    }
  }, [userId]);

  // Disconnect Socket
  useEffect(() => {
    return () => {
      if (typeof socket !== 'string') {
        socket?.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = (): Socket => {
  const context = useContext(SocketContext);

  if (typeof context === 'string') {
    throw new Error('No permission to use this context');
  }

  return context;
};
