import { Layout } from '@/components';
import { UploadImages } from '@/containers';
import { NextPage } from 'next';

const UploadImagesPage: NextPage = () => {
  return (
    <Layout isHeader={true} isFooter={true} title={'Đăng ảnh'}>
      <UploadImages />
    </Layout>
  );
};

export default UploadImagesPage;
