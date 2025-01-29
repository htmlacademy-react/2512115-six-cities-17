import { OfferFullType } from '../../types';
import OfferCard from '../offer-card/offer-card';

type FavProps = {
  offers: OfferFullType[];
  city: string;
};

function FavoriteGroup({ offers, city }: FavProps): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} offerCardType='favorites' />
        ))}
      </div>
    </li>
  );
}

export default FavoriteGroup;
