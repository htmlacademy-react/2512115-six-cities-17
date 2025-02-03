import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { addComment, loadComments, loadCurrentOffer, loadFavoritesCards, loadNearOfferCards, loadOfferCards, requireAuthorization, setAuthData, setCardsLoadingStatus, setCommentUploadStatus, setError, setFavoriteStatus } from './action';
import { APIRoutes, AuthorizationStatus, RequestStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { AppDispatch, AuthData, CommentType, OfferFullType, OfferType, State, UploadCommentData, UserData } from '../types';
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

type AppThunkArgs = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}

export const fetchOffers = createAsyncThunk<void, undefined, AppThunkArgs>(
  'cards/fetchCards',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setCardsLoadingStatus(true));
    const {data} = await api.get<OfferFullType[]>(APIRoutes.Cards);
    dispatch(setCardsLoadingStatus(false));
    dispatch(loadOfferCards(data));
  },
);

export const fetchCurrentOffer = createAsyncThunk<void, string, AppThunkArgs>(
  'cards/fetchCurrentCards',
  async (offerId, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferFullType>(`${APIRoutes.Cards}/${offerId}`);
    dispatch(loadCurrentOffer(data));
  },
);

export const fetchComments = createAsyncThunk<void, string, AppThunkArgs>(
  'data/fetcOfferComments',
  async (offerId, {dispatch, extra: api}) => {
    const {data} = await api.get<CommentType[]>(`${APIRoutes.Comments}/${offerId}`);
    dispatch(loadComments(data));
  }
);

export const toggleFavorite = createAsyncThunk<void, { offerId: string; status: number }, AppThunkArgs>(
  'data/toggleFavorite',
  async ({ offerId, status }, { dispatch, extra: api }) => {
    const { data } = await api.post<OfferFullType>(`${APIRoutes.Favorites}/${offerId}/${status}`);

    dispatch(setFavoriteStatus(data));
  }
);

export const uploadComment = createAsyncThunk<void, UploadCommentData, AppThunkArgs>(
  'app/uploadReview',
  async ({offerId, comment, rating }, {dispatch, extra: api}) => {
    dispatch(setCommentUploadStatus(RequestStatus.Uploading));
    try {
      const {data} = await api.post<CommentType>(`${APIRoutes.Comments}/${offerId}`, { comment, rating });
      dispatch(addComment(data));
      dispatch(setCommentUploadStatus(RequestStatus.Success));
    } catch {
      dispatch(setCommentUploadStatus(RequestStatus.Error));
    }
  }
);

export const fetchFavorites = createAsyncThunk<void, undefined, AppThunkArgs>(
  'data/fetchFavorites',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferType[]>(APIRoutes.Favorites);
    dispatch(loadFavoritesCards(data));
  }
);

export const fetchNearOfferCards = createAsyncThunk<void, string, AppThunkArgs>(
  'data/fetchNearOfferCards',
  async (offerId, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferFullType[]>(`${APIRoutes.Cards}/${offerId}/nearby`);
    dispatch(loadNearOfferCards(data));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, AppThunkArgs>
('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  try {
    const { data: userData } = await api.get<UserData>(APIRoutes.Login);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setAuthData(userData));
  } catch (error) {
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
});

export const loginAction = createAsyncThunk<void, AuthData, AppThunkArgs>
('user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data: userData } = await api.post<UserData>(APIRoutes.Login, { email, password });
    saveToken(userData.token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setAuthData(userData));
  });

export const logoutAction = createAsyncThunk<void, undefined, AppThunkArgs>
('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoutes.Logout);
  dropToken();
  dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  dispatch(setAuthData(null));
});
