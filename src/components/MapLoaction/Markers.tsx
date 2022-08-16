import 'leaflet/dist/leaflet.css';
import { FC } from 'react';
import { Marker } from 'react-leaflet';
import { getMarkerIcon } from './MarkerIcon';
const Markers: FC<IMarkers> = ({ coord, icon }) => {
  return <Marker position={coord} icon={getMarkerIcon(icon)}></Marker>;
};

export default Markers;
