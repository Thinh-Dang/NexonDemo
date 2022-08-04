import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import '@/styles/global.css';
import 'antd/dist/antd.css';
import { UserProvider } from '@/context/UserContext';

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </SessionProvider>
  );
}
