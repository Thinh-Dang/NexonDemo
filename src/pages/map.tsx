import Head from '@/components/map/Header';
import Nav from '@/components/map/Nav';
import dynamic from 'next/dynamic';
import React from 'react';
const MapPage = () => {
  const MapWithNoSSR = dynamic(() => import('@/components/map/Map'), {
    ssr: false,
  });
  return (
    <div>
      <Head title="Home" description="" url="" ogImage="" />
      <Nav />

      <div>
        <MapWithNoSSR />
      </div>
    </div>
  );
};

export default MapPage;
