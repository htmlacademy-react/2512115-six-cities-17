import OffersList from '../../components/offers-list/offers-list';
import { useState } from 'react';
import Map from '../../components/map/map';
import LocationGroup from '../../components/location-group/location-group';
import { useAppSelector } from '../../hooks';
import OffersEmpty from '../offers-empty/offers-empty';

function Main(): JSX.Element {
  const offerCards = useAppSelector((state) => state.offerCards);
  const currentCity = useAppSelector((state) => state.currentCity);
  const cityOfferCards = offerCards.filter((offerCard) => offerCard.city.name === currentCity);

  const [isActiveOffer, setIsActiveOffer] = useState<string | null>(null);
  const handleActiveOfferChange = (id: string | null) => setIsActiveOffer(id);

  return (
    <main className={`page__main page__main--index${cityOfferCards.length > 0 ? '' : ' page__main--index-empty'}`}>
      <h1 className="visually-hidden">Cities</h1>
      <LocationGroup currentCity={currentCity} />
      <div className="cities">
        <div className={`cities__places-container container${cityOfferCards.length > 0 ? '' : ' cities__places_container--empty'}`}>
          {cityOfferCards.length > 0 ?
            <OffersList onHandleActiveOfferChange={handleActiveOfferChange} offers={cityOfferCards} currentCity={currentCity} /> :
            <OffersEmpty cityName={currentCity} />}

          {cityOfferCards[0] !== undefined ? <Map offers={cityOfferCards} isActiveOffer={isActiveOffer} city={cityOfferCards[0].city} className="cities" /> : null }
        </div>
      </div>

    </main>
  );
}

export default Main;
