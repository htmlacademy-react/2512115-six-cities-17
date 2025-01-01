import { useParams } from 'react-router-dom';
import { CommentType, OfferFullType, OfferType } from '../../types';
import OfferCard from '../../components/offer-card/offer-card';
import OfferFullCard from '../../components/offer-full-card/offer-full-card';

type OffersProps = {
  offerFull: OfferFullType[];
  comments: CommentType[];
  offers: OfferType[];
};

function Offer({offerFull, comments, offers}: OffersProps): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const currentOffer = offerFull?.find((item) => item.id === id);

  if (!currentOffer) {
    return (
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__container container">
            <div className="offer__wrapper">
              <p>Предложение не найдено</p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page__main page__main--offer">
      <OfferFullCard offerFull={currentOffer} comments={comments} offers={offers}/>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {offers.filter((offer) => offer.id !== currentOffer.id).slice(0,3).map((offer) => (
              <OfferCard key={offer.id} offer={offer} offerCardType='near-places' />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Offer;
