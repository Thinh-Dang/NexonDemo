import L from 'leaflet';
import currentPosIcon from '../../../public/assets/images/current-pos-icon.svg';
import friendPosIcon from '../../../public/assets/images/friend-pos-icon.svg';

function createIcon(url: string) {
  return new L.Icon({
    iconUrl: url,
  });
}

function getMarkerIcon(iconName: string) {
  if (iconName === 'currentPosIcon') return createIcon(currentPosIcon.src);
  return createIcon(friendPosIcon.src);
}
export { getMarkerIcon };
