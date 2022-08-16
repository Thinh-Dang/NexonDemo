import { Layout } from '@/components';
import VerifyPhone from '@/containers/VerifyPhone/VerifyPhone';
import { NextPage } from 'next';
import React from 'react';

type Props = {};

const login: NextPage = (props: Props) => {
  return (
    <Layout islogo={false} title="Login_Phone" isFooter={false} isHeader={true}>
      <VerifyPhone isPhone={false} />
    </Layout>
  );
};

export default login;
