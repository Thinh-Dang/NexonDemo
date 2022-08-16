import { RootState, useAppSelector } from '@/redux';
import { Map } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FC, useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import AnimatedPanning from './AnimatedPanning';
import ListMarkers from './ListMarkers';

const MapLocationComponent: FC<IListMarkers> = ({ listNearUser }) => {
  const [map, setMap] = useState<Map>();
  const userPosition = useAppSelector(
    (state: RootState) => state.mapLocationSlice.userPosition,
  );
  useEffect(() => {
    if (map) {
      setInterval(function () {
        map.invalidateSize();
      }, 100);
    }
  }, [map]);
  return (
    <MapContainer
      center={userPosition}
      zoom={13}
      scrollWheelZoom
      style={{ height: '710px', width: '100%' }}
      whenCreated={setMap}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ListMarkers listNearUser={listNearUser} />
      <AnimatedPanning />
    </MapContainer>
  );
};

export default MapLocationComponent;
