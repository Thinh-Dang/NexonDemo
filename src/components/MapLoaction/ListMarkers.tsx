import { RootState, useAppSelector } from '@/redux';
import { FC, useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import currentPosIcon from '../../../public/assets/images/current-pos-icon.svg';
import shadowCurrentPosIcon from '../../../public/assets/images/current-pos-shadow-icon.svg';
import friendPosIcon from '../../../public/assets/images/friend-pos-icon.svg';
import CustomMarker from './Marker';

const ListMarkers: FC<IListMarkers> = ({ friendsNearUser }) => {
  const unmounted = useRef(false);
  const map = useMap();
  const userPosition = useAppSelector(
    (state: RootState) => state.mapLocationSlice.userPosition,
  );
  useEffect(() => {
    map.locate().on('locationfound', function () {
      map.flyTo(userPosition, map.getZoom());
    });
    return () => {
      unmounted.current = true;
    };
  }, [map, userPosition]);

  return (
    <>
      <CustomMarker
        coord={userPosition}
        icon={currentPosIcon}
        shadowIcon={shadowCurrentPosIcon}
      />
      {friendsNearUser.map((p, index) => {
        return (
          <CustomMarker
            key={index}
            coord={{ lat: p.latitude, lng: p.longtitude }}
            icon={friendPosIcon}
            friendInfo={p}
          />
        );
      })}
    </>
  );
};

export default ListMarkers;
