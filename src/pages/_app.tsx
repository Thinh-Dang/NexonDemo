import { AppProps } from 'next/app';
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
