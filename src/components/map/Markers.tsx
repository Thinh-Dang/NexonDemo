import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { FC, useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';

const DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
});

L.Marker.prototype.options.icon = DefaultIcon;
interface IMarkers {
  position: { lat: number; lng: number };
}
const Markers: FC<IMarkers> = ({ position }) => {
  const [pos, setPos] = useState(position);
  const location = useMapEvents({
    click() {
      location.locate();
    },
    locationfound(e) {
      setPos(e.latlng);
      location.flyTo(e.latlng, location.getZoom());
    },
  });

  return pos === null ? null : (
    <Marker position={pos}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  );
};

export default Markers;
