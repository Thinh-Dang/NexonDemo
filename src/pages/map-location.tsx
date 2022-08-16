import MapLocationContainer from '@/containers/MapLocation/MapLocation';
const listNearUser: IMap[] = [
  {
    lat: 10.843212,
    lng: 106.7120901,
  },
  {
    lat: 10.8433094,
    lng: 106.7118662,
  },
];
const MapLocationPage = () => {
  return <MapLocationContainer listNearUser={listNearUser} />;
};

export default MapLocationPage;
