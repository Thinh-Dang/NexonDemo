import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import '@/styles/global.scss';
import 'antd/dist/antd.css';
import { UserProvider } from '@/context/UserContext';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
