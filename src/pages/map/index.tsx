import Spinning from '@/components/Spinning/Spinning';
import MapLocationContainer from '@/containers/MapLocation/MapLocation';
import { RootState, useAppDispatch, useAppSelector } from '@/redux';
import {
  createOrUpdateLocation,
  getFriendNearUser,
} from '@/redux/slice/mapLocationSlice';
import { FC, useEffect } from 'react';

const MapPage: FC = () => {
  const dispatch = useAppDispatch();
  const { userPosition } = useAppSelector(
    (state: RootState) => state.mapLocationSlice,
  );
  useEffect(() => {
    dispatch(getFriendNearUser());
  }, [dispatch]);
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
      });
    }
  }, [dispatch]);
  return userPosition.lat !== 0 && userPosition.lng !== 0 ? (
    <MapLocationContainer />
  ) : (
    <Spinning />
  );
};

export default MapPage;
