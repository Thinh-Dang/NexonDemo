import { FC, useEffect, useState } from 'react';
import style from './Layout.module.scss';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAppSelector, RootState } from '@/redux';
import { Footer } from '../common';
import Loading from '../Loading/Loading';
import Header from '../common/Header/Header';

export const Layout: FC<ILayout> = ({
  header,
  children,
  footer = <Footer />,
  isHeader = true,
  isFooter = true,
  title,
  islogo,
}) => {
  const router = useRouter();
  const location = router.pathname;
  const isLogin =
    useAppSelector((state: RootState) => state.userSlice.isLogin) || true;
  return (
    <div className={style.layout}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isHeader ? <Header isLogo={islogo} /> : ''}
      <div className={style.children}>{children}</div>
      {isFooter && footer}
    </div>
  );
};
