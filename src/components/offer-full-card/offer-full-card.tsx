import { CommentType, OfferFullType, OfferType } from '../../types';
import CommentForm from '../comment-form/comment-form';
import CommentList from '../comment-list/comment-list';
import Map from '../map/map';

type OfferFullCardProps = {
  offerFull: OfferFullType;
  comments: CommentType[];
  offers: OfferType[];
}

function OfferFullCard({offerFull, comments, offers}: OfferFullCardProps): JSX.Element {
  return (
    <section className="offer">
      <div className="offer__gallery-container container">
        <div className="offer__gallery">
          <div className="offer__image-wrapper">
            <img className="offer__image" src="img/room.jpg" alt="Photo studio" />
          </div>
          <div className="offer__image-wrapper">
            <img
              className="offer__image"
              src="img/apartment-01.jpg"
              alt="Photo studio"
            />
          </div>
          <div className="offer__image-wrapper">
            <img
              className="offer__image"
              src="img/apartment-02.jpg"
              alt="Photo studio"
            />
          </div>
          <div className="offer__image-wrapper">
            <img
              className="offer__image"
              src="img/apartment-03.jpg"
              alt="Photo studio"
            />
          </div>
          <div className="offer__image-wrapper">
            <img
              className="offer__image"
              src="img/studio-01.jpg"
              alt="Photo studio"
            />
          </div>
          <div className="offer__image-wrapper">
            <img
              className="offer__image"
              src="img/apartment-01.jpg"
              alt="Photo studio"
            />
          </div>
        </div>
      </div>
      <div className="offer__container container">
        <div className="offer__wrapper">
          {offerFull.isPremium && (
            <div className="offer__mark">
              <span>Premium</span>
            </div>
          )}
          <div className="offer__name-wrapper">
            <h1 className="offer__name">
              {offerFull.title}
            </h1>
            <button className="offer__bookmark-button button" type="button">
              <svg className="offer__bookmark-icon" width={31} height={33}>
                <use xlinkHref="#icon-bookmark" />
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="offer__rating rating">
            <div className="offer__stars rating__stars">
              <span style={{ width: `${offerFull.rating * 20}%` }} />
              <span className="visually-hidden">Rating</span>
            </div>
            <span className="offer__rating-value rating__value">{offerFull.rating}</span>
          </div>
          <ul className="offer__features">
            <li className="offer__feature offer__feature--entire">{offerFull.type}</li>
            <li className="offer__feature offer__feature--bedrooms">
              {offerFull.bedrooms} Bedrooms
            </li>
            <li className="offer__feature offer__feature--adults">
              Max {offerFull.maxAdults} adults
            </li>
          </ul>
          <div className="offer__price">
            <b className="offer__price-value">€{offerFull.price}</b>
            <span className="offer__price-text">&nbsp;night</span>
          </div>
          <div className="offer__inside">
            <h2 className="offer__inside-title">What&apos;s inside</h2>
            <ul className="offer__inside-list">
              {offerFull.goods.map((good) => (
                <li key={good} className="offer__inside-item">{good}</li>
              ))}
            </ul>
          </div>
          <div className="offer__host">
            <h2 className="offer__host-title">Meet the host</h2>
            <div className="offer__host-user user">
              <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                <img
                  className="offer__avatar user__avatar"
                  src={offerFull.host.avatarUrl}
                  width={74}
                  height={74}
                  alt="Host avatar"
                />
              </div>
              <span className="offer__user-name">{offerFull.host.name}</span>
              <span className="offer__user-status">{offerFull.host.isPro}</span>
            </div>
            <div className="offer__description">
              <p className="offer__text">
                {offerFull.description}
              </p>
            </div>
          </div>
          <section className="offer__reviews reviews">
            <CommentList comments={comments}/>
            <CommentForm/>
          </section>
        </div>
      </div>
      <Map
        offers={[...offers].sort((a, b) => (a.id === offerFull.id ? -1 : b.id === offerFull.id ? 1 : 0)).slice(0, 4)}
        isActiveOffer={offerFull.id}
        city={offers[0].city}
        className="offer"
      />
    </section>
  );
}

export default OfferFullCard;
