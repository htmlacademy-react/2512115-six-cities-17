import { useParams } from 'react-router-dom';
import OfferCard from '../../components/offer-card/offer-card';
import OfferFullCard from '../../components/offer-full-card/offer-full-card';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { fetchComments, fetchCurrentOffer, fetchNearOfferCards } from '../../store/api-actions';

function Offer(): JSX.Element {
  const dispatch = useAppDispatch();
  const {id: offerId = ''} = useParams();
  const currentOffer = useAppSelector((state) => state.currentOffer);
  const offerComments = useAppSelector((state) => state.commentsOffer);
  const nearOfferCards = useAppSelector((state) => state.nearOfferCards.slice(0, 3));

  useEffect(() => {
    if (offerId) {
      dispatch(fetchCurrentOffer(offerId));
      dispatch(fetchComments(offerId));
      dispatch(fetchNearOfferCards(offerId));
    }
  }, [dispatch, offerId]);

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
      <OfferFullCard currentOffer={currentOffer} comments={offerComments} nearOfferCards={nearOfferCards} />
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {nearOfferCards.map((card) => (
              <OfferCard key={card.id} offer={card} offerCardType="near-places"/>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Offer;
