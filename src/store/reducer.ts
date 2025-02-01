import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, CITIES, RequestStatus, SortItem } from '../const';
import { CommentType, OfferFullType, OfferType, UserData } from '../types';
import { addComment, changeCity, changeSorting, loadComments, loadCurrentOffer, loadFavoritesCards, loadNearOfferCards, loadOfferCards, requireAuthorization, setAuthData, setCardsLoadingStatus, setCommentUploadStatus, setError } from './action';

const initialState = {
  currentCity: CITIES[0],
  currentSort: SortItem.Popular,
  offerCards: [] as OfferFullType[],
  isOffersLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  currentOffer: null as OfferFullType | null,
  commentsOffer: [] as CommentType[],
  nearOfferCards: [] as OfferType[],
  favoritesCards: [] as OfferType[],
  userData: null as UserData | null,
  commentUploadStatus: RequestStatus.Idle,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOfferCards, (state, action) => {
      state.offerCards = action.payload;
    })
    .addCase(loadCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.commentsOffer = action.payload;
    })
    .addCase(addComment, (state, action) => {
      state.commentsOffer.push(action.payload);
    })
    .addCase(setCommentUploadStatus, (state, action) => {
      state.commentUploadStatus = action.payload;
    })
    .addCase(loadNearOfferCards, (state, action) => {
      state.nearOfferCards = action.payload;
    })
    .addCase(loadFavoritesCards, (state, action) => {
      state.favoritesCards = action.payload;
    })
    .addCase(changeCity, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(changeSorting, (state, action) => {
      state.currentSort = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setAuthData, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setCardsLoadingStatus, (state, action) => {
      state.isOffersLoading = action.payload;
    });
});
