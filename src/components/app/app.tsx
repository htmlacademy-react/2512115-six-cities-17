import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

import Main from '../../pages/main/main';
import Offer from '../../pages/offer/offer';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Error from '../../pages/error/error';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import Layout from '../layout/layout';
import { CommentType, OfferFullType, OfferType } from '../../types';

type AppProps = {
  offers: OfferType[];
  offerFull: OfferFullType[];
  comments: CommentType[];
}

function App({offers, comments, offerFull}: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index
              path={AppRoute.Main}
              element={<Main offers={offers}/>}
            />
            <Route
              path={AppRoute.Login}
              element={<Login/>}
            />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute
                  authorizationStatus={AuthorizationStatus.Auth}
                >
                  <Favorites offers={offers}/>
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoute.Offer}
              element={<Offer offerFull={offerFull} comments={comments} offers={offers}/>}
            />
            <Route
              path='*'
              element={<Error/>}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
