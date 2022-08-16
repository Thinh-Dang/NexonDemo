import { useAppDispatch } from '@/redux';
import { updateUserPosition } from '@/redux/slice/mapLocationSlice';
import { FC, useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import Markers from './Markers';

const ListMarkers: FC<IListMarkers> = ({ listNearUser }) => {
  const [userPos, setUserPos] = useState<IMap>({ lat: 0, lng: 0 });
  const map = useMap();
  const dispatch = useAppDispatch();
  useEffect(() => {
    map.locate().on('locationfound', function (e) {
      setUserPos(e.latlng);
      dispatch(updateUserPosition({ userPosition: e.latlng }));
      map.flyTo(e.latlng, map.getZoom());
    });
  }, [dispatch, map]);

  return (
    <>
      <Markers coord={userPos} icon={'currentPosIcon'} />
      {listNearUser.map((p, index) => {
        return <Markers key={index} coord={p} icon={'friendPosIcon'} />;
      })}
    </>
  );
};

export default ListMarkers;
