import { AuthorizationStatus } from '../../const';
import { getRatingInPercents } from '../../helpers';
import { useAppSelector } from '../../hooks';
import { CommentType, OfferFullType, OfferType } from '../../types';
import CommentForm from '../comment-form/comment-form';
import CommentList from '../comment-list/comment-list';
import FavoriteButton from '../favorite-button/favorite-button';
import Map from '../map/map';

type OfferFullCardProps = {
  currentOffer: OfferFullType & OfferType;
  comments: CommentType[];
  nearOfferCards: OfferType[];
}

function OfferFullCard({currentOffer, comments, nearOfferCards}: OfferFullCardProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const displayedImages = [...currentOffer.images].slice(0, 6);

  return (
    <section className="offer">
      <div className="offer__gallery-container container">
        <div className="offer__gallery">
          {displayedImages.map((image, index) => (
            <div key={image} className="offer__image-wrapper">
              <img className="offer__image" src={image} alt={`Offer photo ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
      <div className="offer__container container">
        <div className="offer__wrapper">
          {currentOffer.isPremium && (
            <div className="offer__mark">
              <span>Premium</span>
            </div>
          )}
          <div className="offer__name-wrapper">
            <h1 className="offer__name">
              {currentOffer.title}
            </h1>
            <FavoriteButton isFavorite={currentOffer.isFavorite} offerId={currentOffer.id} favoriteBtnType='offer' />
          </div>
          <div className="offer__rating rating">
            <div className="offer__stars rating__stars">
              <span style={{width: getRatingInPercents(currentOffer.rating)}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
            <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
          </div>
          <ul className="offer__features">
            <li className="offer__feature offer__feature--entire">{currentOffer.type}</li>
            <li className="offer__feature offer__feature--bedrooms">
              {currentOffer.bedrooms} Bedrooms
            </li>
            <li className="offer__feature offer__feature--adults">
              Max {currentOffer.maxAdults} adults
            </li>
          </ul>
          <div className="offer__price">
            <b className="offer__price-value">€{currentOffer.price}</b>
            <span className="offer__price-text">&nbsp;night</span>
          </div>
          <div className="offer__inside">
            <h2 className="offer__inside-title">What&apos;s inside</h2>
            <ul className="offer__inside-list">
              {currentOffer.goods.map((good) => (
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
                  src={currentOffer.host.avatarUrl}
                  width={74}
                  height={74}
                  alt="Host avatar"
                />
              </div>
              <span className="offer__user-name">{currentOffer.host.name}</span>
              <span className="offer__user-status">{currentOffer.host.isPro}</span>
            </div>
            <div className="offer__description">
              <p className="offer__text">
                {currentOffer.description}
              </p>
            </div>
          </div>
          <section className="offer__reviews reviews">
            <CommentList comments={comments}/>
            {authorizationStatus === AuthorizationStatus.Auth && (
              <CommentForm offerId={currentOffer.id} />
            )}
          </section>
        </div>
      </div>

      <Map
        offers={[currentOffer, ...nearOfferCards]}
        isActiveOffer={currentOffer.id}
        city={currentOffer.city}
        className="offer"
      />
    </section>
  );
}

export default OfferFullCard;
