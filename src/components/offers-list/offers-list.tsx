import { sortOffers } from '../../helpers';
import { useAppSelector } from '../../hooks';
import { OfferType } from '../../types';
import OfferCard from '../offer-card/offer-card';
import Sorting from '../sorting/sorting';

type AppProps = {
  offers: OfferType[];
  onHandleActiveOfferChange?: (id: string | null) => void;
  currentCity: string;
}

function OffersList({offers, onHandleActiveOfferChange, currentCity}: AppProps) {
  const currentSort = useAppSelector((state) => state.currentSort);
  const sortedOfferCards = sortOffers(offers, currentSort);

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offers.length} places to stay in {currentCity}</b>
      <Sorting />
      <div className="cities__places-list places__list tabs__content">
        {sortedOfferCards.map((offer) => (
          <OfferCard onHandleActiveOfferChange={onHandleActiveOfferChange} key={offer.id} offer={offer} offerCardType='cities' />
        ))}
      </div>
    </section>
  );
}

export default OffersList;
