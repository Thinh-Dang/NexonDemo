import FriendInfoComponent from '@/components/FriendInfo/FriendInfo';
import Head from '@/components/MapLoaction/Header';
import dynamic from 'next/dynamic';
import React, { ComponentType, FC } from 'react';

const MapLocationContainer: FC<IMapLocationContainer> = ({ listNearUser }) => {
  const MapWithNoSSR: ComponentType<IMapLocationContainer> = dynamic(
    () => import('@/components/MapLoaction/MapLocation'),
    {
      ssr: false,
    },
  );
  return (
    <div>
      <Head title="Home" description="" url="" ogImage="" />
      <div>
        <MapWithNoSSR listNearUser={listNearUser} />
      </div>
      <FriendInfoComponent />
    </div>
  );
};

export default MapLocationContainer;
