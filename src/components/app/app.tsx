import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

import Main from '../../pages/main/main';
import Offer from '../../pages/offer/offer';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Error from '../../pages/error/error';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import Layout from '../layout/layout';
import { useAppDispatch, useAppSelector } from '../../hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import { useEffect } from 'react';
import { fetchFavorites } from '../../store/api-actions';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOffersLoading = useAppSelector((state) => state.isOffersLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavorites());
    }
  }, [authorizationStatus, dispatch]);

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
            />
            <Route
              path={AppRoute.Login}
              element={
                <PrivateRoute reversed >
                  <Login/>
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute >
                  <Favorites />
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
