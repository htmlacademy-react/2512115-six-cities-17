import { OfferType } from '../../types';
import OfferCard from '../offer-card/offer-card';

type AppProps = {
  offers: OfferType[];
  onHandleActiveOfferChange?: (id: string | null) => void;
}

function OffersList({offers, onHandleActiveOfferChange}: AppProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard onHandleActiveOfferChange={onHandleActiveOfferChange} key={offer.id} offer={offer} offerCardType='cities' />
      ))}
    </div>
  );
}

export default OffersList;
