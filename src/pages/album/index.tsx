import { Layout } from '@/components';
import { UploadImages } from '@/containers';
import { NextPage } from 'next';

const AlbumPage: NextPage = () => {
  return (
    <Layout isHeader={true} isFooter={true} title={'Album'}>
      <h1>hello</h1>
    </Layout>
  );
};

export default AlbumPage;
