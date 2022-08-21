import { RootState, useAppSelector } from '@/redux';
import 'leaflet/dist/leaflet.css';
import { FC } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import AnimatedPanning from './AnimatedPanning';
import ListMarkers from './ListMarkers';
import styles from './Map.module.scss';
const MapComponent: FC = () => {
  const { centerPosition, friendsNearUser, zoomLevel } = useAppSelector(
    (state: RootState) => state.mapLocationSlice,
  );

  return (
    <MapContainer
      center={centerPosition}
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
      <ListMarkers friendsNearUser={friendsNearUser} />
      <AnimatedPanning />
    </MapContainer>
  );
};

export default MapComponent;
