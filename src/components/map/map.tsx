import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import { CityType, OfferFullType } from '../../types';

type MapProps = {
  city: CityType;
  offers: OfferFullType[];
  isActiveOffer: string | null;
  className: string;
};

const defaultCustomIcon = new Icon({
  iconUrl: 'markup/img/pin.svg',
  iconSize: [28, 40],
  iconAnchor: [14, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: 'markup/img/pin-active.svg',
  iconSize: [28, 40],
  iconAnchor: [14, 40]
});

function Map({city, offers, isActiveOffer, className}: MapProps): JSX.Element {

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
  return (
    <div className="cities__right-section">
      <section className={`${className}__map map`} ref={mapRef}></section>;
    </div>);
}

export default Map;
