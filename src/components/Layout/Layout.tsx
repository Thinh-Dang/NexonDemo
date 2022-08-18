import { FC } from 'react';
import style from './Layout.module.scss';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAppSelector, RootState } from '@/redux';
import { Header, Footer } from '../common';
import { ILayout } from '@/@type/components';

export const Layout: FC<ILayout> = ({
  header = <Header />,
  children,
  footer = <Footer />,
  isHeader = true,
  isFooter = true,
  title,
}) => {
  const router = useRouter();
  const location = router.pathname;
  const isLogin =
    useAppSelector((state: RootState) => state.userSlice.isLogin) || true;

  if (!isLogin && location !== '/auth/login' && location !== '/auth/register') {
    router.push('/auth/login');
    return <></>;
  } else {
    return (
      <div className={style.layout}>
        <Head>
          <title>{title}</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {isHeader && header}
        <div className={style.children}>{children}</div>
        {isFooter && footer}
      </div>
    );
  }
};
