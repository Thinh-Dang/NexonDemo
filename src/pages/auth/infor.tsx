import { Layout } from '@/components';
import UpdateInfor from '@/containers/UpdateInfor/UpdateInfor';
import VerifyPhone from '@/containers/VerifyPhone/VerifyPhone';
import { NextPage } from 'next';
import React from 'react';

type Props = {};

const infor: NextPage = (props: Props) => {
  return (
    <Layout islogo={false} title="Login_Phone" isFooter={false} isHeader={true}>
      <UpdateInfor />
    </Layout>
  );
};

export default infor;
