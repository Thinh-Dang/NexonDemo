import { Layout } from '@/components';
import Welcome from '@/containers/Welcome/Welcome';
import type { NextPage } from 'next';
const Home: NextPage = () => {
  return (
    <Layout title="Home" isFooter={false} isHeader={true} islogo={true}>
      <Welcome />
    </Layout>
  );
};

export default Home;
