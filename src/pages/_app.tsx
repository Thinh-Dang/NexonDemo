import { AppProps } from 'next/app';
import 'antd/dist/antd.css';
import '@/styles/global.scss';

import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { store, persistor } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </PersistGate>
    </Provider>
  );
}
