import { IListMarkers } from '@/@type/components';
import { RootState, useAppSelector } from '@/redux';
import { FC } from 'react';
import currentPosIcon from '../../../public/assets/images/current-pos-icon.svg';
import friendPosIcon from '../../../public/assets/images/friend-pos-icon.svg';
import CustomMarker from './Marker';

const ListMarkers: FC<IListMarkers> = ({ friendsNearUser }) => {
  const userPosition = useAppSelector(
    (state: RootState) => state.mapLocationSlice.userPosition,
  );

  return (
    <>
      <CustomMarker coord={userPosition} icon={currentPosIcon} />
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
