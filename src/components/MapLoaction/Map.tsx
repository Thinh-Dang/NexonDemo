import { RootState, useAppSelector } from '@/redux';
import 'leaflet/dist/leaflet.css';
import { FC } from 'react';
import { Circle, MapContainer, TileLayer, useMapEvent } from 'react-leaflet';
import ListMarkers from './ListMarkers';
import styles from './Map.module.scss';
const MapComponent: FC = () => {
  const { userPosition, friendsNearUser, zoomLevel } = useAppSelector(
    (state: RootState) => state.mapLocationSlice,
  );
  const { radius } = useAppSelector((state: RootState) => state.settingsSlice);
  function SetViewOnClick() {
    const map = useMapEvent('click', (e) => {
      map.setView(e.latlng, map.getZoom(), {
        animate: true,
      });
    });

    return null;
  }
  return (
    <MapContainer
      center={userPosition}
      zoom={zoomLevel}
      zoomControl
      scrollWheelZoom
      className={styles.map_location}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
        maxZoom={20}
      />
      <Circle
        center={userPosition}
        radius={radius * 1000}
        stroke={true}
        color="#cb7f8b"
      />
      <ListMarkers friendsNearUser={friendsNearUser} />
      <SetViewOnClick />
    </MapContainer>
  );
};

export default MapComponent;
