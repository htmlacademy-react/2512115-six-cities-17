import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { loadComments, loadCurrentOffer, loadFavoritesCards, loadNearOfferCards, loadOfferCards, redirectToRoute, requireAuthorization, setAuthData, setCardsLoadingStatus, setError } from './action';
import { APIRoutes, AppRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { AppDispatch, AuthData, CommentType, OfferFullType, OfferType, State, UserData } from '../types';
import { dropToken, saveToken } from '../services/token';
import { store } from './';

export const clearErrorAction = createAsyncThunk(
  'app/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'cards/fetchCards',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setCardsLoadingStatus(true));
    const {data} = await api.get<OfferFullType[]>(APIRoutes.Cards);
    dispatch(setCardsLoadingStatus(false));
    dispatch(loadOfferCards(data));
  },
);

export const fetchCurrentOffer = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'cards/fetchCurrentCards',
  async (offerId, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferFullType>(`${APIRoutes.Cards}/${offerId}`);
    dispatch(loadCurrentOffer(data));
  },
);

export const fetchComments = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOfferReviews',
  async (offerId, {dispatch, extra: api}) => {
    const {data} = await api.get<CommentType[]>(`${APIRoutes.Comments}/${offerId}`);
    dispatch(loadComments(data));

  }
);

export const fetchFavorites = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavorites',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferType[]>(APIRoutes.Favorites);
    dispatch(loadFavoritesCards(data));

  }
);

export const fetchNearOfferCards = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearOfferCards',
  async (offerId, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferFullType[]>(`${APIRoutes.Cards}/${offerId}/nearby`);
    dispatch(loadNearOfferCards(data));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  try {
    const { data: userData } = await api.get<UserData>(APIRoutes.Login);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setAuthData(userData));
  } catch (error) {
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
});

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data: {token} } = await api.post<UserData>(APIRoutes.Login, { email, password });
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    setTimeout(() => {
      dispatch(redirectToRoute(AppRoute.Main));
    }, 100);
  });

export const logoutAction = createAsyncThunk<void, undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoutes.Logout);
  dropToken();
  dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
});
