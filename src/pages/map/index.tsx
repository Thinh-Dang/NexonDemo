import Spinning from '@/components/Spinning/Spinning';
import MapLocationContainer from '@/containers/MapLocation/MapLocation';
import { RootState, useAppDispatch, useAppSelector } from '@/redux';
import {
  createOrUpdateLocation,
  getFriendNearUser,
} from '@/redux/slice/mapLocationSlice';
import { getRadius } from '@/redux/slice/settingsSlice';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

const MapPage: FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { userPosition } = useAppSelector(
    (state: RootState) => state.mapLocationSlice,
  );
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log('position.coords.latitude', position.coords.latitude);
        console.log('position.coords.longitude', position.coords.longitude);

        dispatch(
          createOrUpdateLocation({
            latitude: position.coords.latitude,
            longtitude: position.coords.longitude,
          }),
        );
        // dispatch(getFriendNearUser());
      });
    } else {
      router.push('/profile');
    }
  }, []);

  useEffect(() => {
    dispatch(getRadius());
  }, []);

  return userPosition.lat !== 0 && userPosition.lng !== 0 ? (
    <>
      <MapLocationContainer />
    </>
  ) : (
    <div
      className="spinning-container"
      style={{
        height: '100vh',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Spinning />
    </div>
  );
};

export default MapPage;
