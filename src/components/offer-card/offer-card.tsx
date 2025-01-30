import { Link } from 'react-router-dom';
import { OfferCardType, OfferType } from '../../types';
import { AppRoute } from '../../const';

type AppProps = {
  offer: OfferType;
  offerCardType: OfferCardType;
  onHandleActiveOfferChange?: (id: string | null) => void;
}

function OfferCard({offer, offerCardType, onHandleActiveOfferChange}: AppProps): JSX.Element {
  return (
    <article className={`${offerCardType}__card place-card`}
      onMouseEnter={() => onHandleActiveOfferChange && onHandleActiveOfferChange(offer.id)}
      onMouseLeave={() => onHandleActiveOfferChange && onHandleActiveOfferChange(null)}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${offerCardType}__image-wrapper place-card__image-wrapper`}>
        <Link to ={AppRoute.Offer.replace(':id', offer.id)}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={offerCardType === 'cities' || offerCardType === 'near-places' ? '260' : '150'}
            height={offerCardType === 'cities' || offerCardType === 'near-places' ? '200' : '110'}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={`${offerCardType === 'favorites' ? `${offerCardType}__card-info ` : ''}place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className="place-card__bookmark-button button"
            type="button"
          >
            <svg
              className="place-card__bookmark-icon"
              width={18}
              height={19}
            >
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: offerCardType === 'favorites' ? '100%' : '80%' }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to ={AppRoute.Offer.replace(':id', offer.id)}>
            {offer.title}
          </Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
