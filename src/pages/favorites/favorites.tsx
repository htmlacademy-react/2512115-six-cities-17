import { getOfferGroups } from '../../adaptors';
import FavoriteGroup from '../../components/favorite-group/favorite-group';
import Footer from '../../components/footer/footer';
import { useAppSelector } from '../../hooks';
import { OfferType } from '../../types';

function Favorites(): JSX.Element {
  const favoritesCards = useAppSelector((state) => state.favoritesCards);
  const offerGroups = getOfferGroups(favoritesCards);

  return (
    <>
      <main className={`page__main page__main--favorites${favoritesCards.length > 0 ? '' : ' page__main--favorites-empty'}`}>
        <div className="page__favorites-container container">
          {favoritesCards.length > 0 ? (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Object.keys(offerGroups).map((groupKey) => {
                  const group: OfferType[] = offerGroups[groupKey];
                  return (
                    <FavoriteGroup
                      key={groupKey}
                      offers={group}
                      city={groupKey}
                    />
                  );
                })}
              </ul>
            </section>
          ) : (
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Favorites;
