import { useEffect, useState } from 'react';
import type { NextPage } from 'next';

import Welcome from '@/containers/Welcome/Welcome';
import { Layout, Loading } from '@/components';

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
    <Layout title="Home" isFooter={false} isHeader={true} isLogo={true}>
      <Welcome />
    </Layout>
  );
};

export default Home;
