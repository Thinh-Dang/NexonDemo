import { RootState, useAppDispatch, useAppSelector } from '@/redux';
import {
  updateCenterPosition,
  updateFriendInfo,
  updateZoomLevel,
} from '@/redux/slice/mapLocationSlice';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FC, useState } from 'react';
import { Marker, useMap, useMapEvents } from 'react-leaflet';

const CustomMarker: FC<IMarkers> = ({ coord, icon, friendInfo }) => {
  const dispatch = useAppDispatch();
  const { zoomLevel, centerPosition } = useAppSelector(
    (state: RootState) => state.mapLocationSlice,
  );
  const [zoom, setZoom] = useState<number>(zoomLevel);
  const [center, setCenter] = useState<IMap>(centerPosition);
  const map = useMap();
  const DefaultIcon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: icon.src,
  });
  const onClickGetFriendInfo = () => {
    if (friendInfo) {
      map.setView([friendInfo.longtitude, friendInfo.latitude]);
      dispatch(updateZoomLevel(zoom));
      dispatch(updateFriendInfo(friendInfo));
      dispatch(updateCenterPosition(center));
    }
  };

  const mapEvents = useMapEvents({
    zoomend: () => {
      setZoom(mapEvents.getZoom());
    },
    move: () => setCenter(mapEvents.getCenter()),
  });

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
