import { Layout } from '@/components';
import { ChangeSimpleInfo } from '@/containers';
import { NextPage } from 'next';

const UploadImagesPage: NextPage = () => {
  return (
    <Layout isHeader={true} isFooter={true} title={'Đăng ảnh'}>
      <ChangeSimpleInfo />
    </Layout>
  );
};

export default UploadImagesPage;
