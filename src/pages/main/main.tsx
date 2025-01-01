import { OfferType } from '../../types';
import OffersList from '../../components/offers-list/offers-list';
import { useState } from 'react';
import Map from '../../components/map/map';
import LocationGroup from '../../components/location-group/location-group';

const CURRENT_CITY = 'Paris';

type MainProps = {
  offers: OfferType[];
};

function Main({offers}:MainProps): JSX.Element {
  const [isActiveOffer, setIsActiveOffer] = useState<string | null>(null);
  const handleActiveOfferChange = (id: string | null) => setIsActiveOffer(id);

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <LocationGroup currentCity={CURRENT_CITY} />
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offers.length} places to stay in Amsterdam</b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0}>
                Popular
                <svg className="places__sorting-arrow" width={7} height={4}>
                  <use xlinkHref="#icon-arrow-select" />
                </svg>
              </span>
              <ul className="places__options places__options--custom places__options--opened">
                <li className="places__option places__option--active" tabIndex={0}>
                  Popular
                </li>
                <li className="places__option" tabIndex={0}>
                  Price: low to high
                </li>
                <li className="places__option" tabIndex={0}>
                  Price: high to low
                </li>
                <li className="places__option" tabIndex={0}>
                  Top rated first
                </li>
              </ul>
            </form>
            <OffersList onHandleActiveOfferChange={handleActiveOfferChange} offers={offers}/>
          </section>
          <div className="cities__right-section">
            <Map offers={offers} isActiveOffer={isActiveOffer} city={offers[0].city} className="cities" />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
