import { Layout } from '@/components';
import Loading from '@/components/Loading/Loading';
import Welcome from '@/containers/Welcome/Welcome';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
const Home: NextPage = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <Layout title="Home" isFooter={false} isHeader={true} islogo={true}>
      <Welcome />
    </Layout>
  );
};

export default Home;
