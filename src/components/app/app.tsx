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
import { OfferFullType} from '../../types';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

type AppProps = {
  offers: OfferFullType[];
}

function App({offers}: AppProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOffersLoading = useAppSelector((state) => state.isOffersLoading);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index
              path={AppRoute.Main}
              element={<Main />}
              // element={<Main offers={offers}/>}
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
              element={<Offer />}
            />
            <Route
              path='*'
              element={<Error/>}
            />
          </Route>
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
