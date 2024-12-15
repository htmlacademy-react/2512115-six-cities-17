import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import 'leaflet/dist/leaflet.css';
import { CityType, OfferType } from '../../types';

type MapProps = {
  city: CityType;
  offers: OfferType[];
  isActiveOffer: string | null;
};

const defaultCustomIcon = new Icon({
  iconUrl: 'markup/img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: 'markup/img/pin-active.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map({city, offers, isActiveOffer}: MapProps): JSX.Element {

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(
            isActiveOffer !== undefined && isActiveOffer === offer.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, isActiveOffer]);
  return <div style={{height: '500px'}} ref={mapRef}></div>;
}

export default Map;
