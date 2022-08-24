import Spinning from '@/components/Spinning/Spinning';
import MapLocationContainer from '@/containers/MapLocation/MapLocation';
import { RootState, useAppDispatch, useAppSelector } from '@/redux';
import {
  createOrUpdateLocation,
  getFriendNearUser,
  updateFriendInfo,
} from '@/redux/slice/mapLocationSlice';
import { getRadius } from '@/redux/slice/settingsSlice';
import { FC, useEffect, useState } from 'react';

const MapPage: FC = () => {
  const dispatch = useAppDispatch();
  const { userPosition } = useAppSelector(
    (state: RootState) => state.mapLocationSlice,
  );
  const [f, setF] = useState();
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
  }, []);

  useEffect(() => {
    dispatch(getFriendNearUser());
  }, []);

  useEffect(() => {
    dispatch(getRadius());
  }, []);

  useEffect(() => {
    f && dispatch(updateFriendInfo(f));
  });
  return userPosition.lat !== 0 && userPosition.lng !== 0 ? (
    <MapLocationContainer />
  ) : (
    <Spinning />
  );
};

export default MapPage;
