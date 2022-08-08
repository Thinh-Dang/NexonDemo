import { AppProps } from 'next/app';
import '@/styles/global.scss';
import 'antd/dist/antd.css';
import { UserProvider } from '@/context/UserContext';
import { AuthProvider } from '@/context/AuthContext';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </AuthProvider>
  );
}
