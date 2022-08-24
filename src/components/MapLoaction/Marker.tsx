import { IMarkers } from '@/@type/components';
import { useAppDispatch } from '@/redux';
import { updateFriendInfo } from '@/redux/slice/mapLocationSlice';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FC } from 'react';
import { Marker } from 'react-leaflet';

const CustomMarker: FC<IMarkers> = ({ coord, icon, friendInfo }) => {
  const dispatch = useAppDispatch();
  const DefaultIcon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: icon.src,
  });

  const onClickGetFriendInfo = () => {
    if (friendInfo) {
      dispatch(updateFriendInfo(friendInfo));
    }
  };

  return (
    <Marker
      position={coord}
      icon={DefaultIcon}
      eventHandlers={{
        click: onClickGetFriendInfo,
      }}
    ></Marker>
  );
};

export default CustomMarker;
