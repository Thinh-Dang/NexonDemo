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
  'Connect Server Socket Failed',
);

interface ISocketContext {
  children: React.ReactNode;
}

export const SocketProvider: FC<ISocketContext> = ({ children }) => {
  const url = process.env.NEXT_PUBLIC_SOCKET_URL ?? '';
  const user = useAppSelector((state: RootState) => state.userSlice);
  const [socket, setSocket] = useState<Socket | string>(
    'Connect Server Socket Failed',
  );

  // Connect Socket
  useMemo(() => {
    if (user.id && user.isLogin) {
      setSocket(
        io(url, {
          query: {
            userId: user.id,
          },
        }),
      );
    }

    if (!user.isLogin && typeof socket !== 'string') {
      return () => {
        socket?.disconnect();
      };
    }
  }, [user.id]);

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
    throw new Error(context);
  }

  return context;
};
