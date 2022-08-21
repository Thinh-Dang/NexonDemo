import { Layout } from '@/components';
import FriendInfoComponent from '@/components/FriendInfo/FriendInfo';
import MapLocationHead from '@/components/MapLoaction/MapLocationHead';
import { RootState, useAppSelector } from '@/redux';
import dynamic from 'next/dynamic';
import { ComponentType, FC } from 'react';
import styles from './MapLocation.module.scss';
const MapLocationContainer: FC = () => {
  const MapWithNoSSR: ComponentType = dynamic(
    () => import('@/components/MapLoaction/Map'),
    {
      ssr: false,
    },
  );
  const { friendInfo } = useAppSelector(
    (state: RootState) => state.mapLocationSlice,
  );

  return (
    <Layout title="Map location" isHeader={false} isFooter={true}>
      <div className={styles.map_location}>
        <MapLocationHead title="Home" description="" url="" ogImage="" />
        <MapWithNoSSR />
        <FriendInfoComponent friendInfo={friendInfo} />
      </div>
    </Layout>
  );
};

export default MapLocationContainer;
