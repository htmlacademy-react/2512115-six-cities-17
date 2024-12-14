import { getOfferGroups } from '../../adaptors';
import FavoriteGroup from '../../components/favorite-group/favorite-group';
import Footer from '../../components/footer/footer';
import { OfferType } from '../../types';

type FavProps = {
  offers: OfferType[];
};

function Favorites({ offers }: FavProps): JSX.Element {
  const offerGroups = getOfferGroups(offers);
  return (
    <>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
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
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Favorites;
