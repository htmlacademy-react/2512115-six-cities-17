import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

import Main from '../../pages/main/main';
import Offer from '../../pages/offer/offer';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Error from '../../pages/error/error';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './layout';

type AppProps = {
  offersCount: number;
  headerRightSide: boolean;
}

function App({offersCount, headerRightSide}: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout headerRightSide={headerRightSide} />}>
            <Route index
              path={AppRoute.Main}
              element={<Main offersCount={offersCount}/>}
            />
            <Route
              path={AppRoute.Login}
              element={<Login/>}
            />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute
                  authorizationStatus={AuthorizationStatus.NoAuth}
                >
                  <Favorites/>
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoute.DevOfferLogged}
              element={<Offer/>}
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
