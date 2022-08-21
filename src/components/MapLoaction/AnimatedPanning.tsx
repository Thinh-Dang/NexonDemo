import { useMapEvent } from 'react-leaflet';

const AnimatedPanning = () => {
  const SetViewOnClick = () => {
    const map = useMapEvent('click', (e) => {
      map.setView(e.latlng, map.getZoom(), {
        animate: true,
      });
    });

    return null;
  };
  return <SetViewOnClick />;
};

export default AnimatedPanning;
