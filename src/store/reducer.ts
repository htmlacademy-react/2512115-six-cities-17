import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, CITIES, RequestStatus, SortItem } from '../const';
import { CommentType, OfferFullType, OfferType, UserData } from '../types';
import { addComment, changeCity, changeSorting, loadComments, loadCurrentOffer, loadFavoritesCards, loadNearOfferCards, loadOfferCards, requireAuthorization, setAuthData, setCardsLoadingStatus, setCommentUploadStatus, setError, setFavoriteStatus } from './action';

const initialState = {
  currentCity: CITIES[0],
  currentSort: SortItem.Popular,
  offerCards: [] as OfferFullType[],
  isOffersLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  currentOffer: null as (OfferFullType & OfferType) | null,
  commentsOffer: [] as CommentType[],
  nearOfferCards: [] as (OfferFullType[] & OfferType[]),
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
      const favoriteIds = new Set(action.payload.map((offer) => offer.id));

      state.offerCards.forEach((offer) => {
        offer.isFavorite = favoriteIds.has(offer.id);
      });

      state.nearOfferCards.forEach((offer) => {
        offer.isFavorite = favoriteIds.has(offer.id);
      });

      if (state.currentOffer) {
        state.currentOffer.isFavorite = favoriteIds.has(state.currentOffer.id);
      }
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
      if (!action.payload) {
        state.offerCards.forEach((offer) => (offer.isFavorite = false));
        state.nearOfferCards.forEach((offer) => (offer.isFavorite = false));
        if (state.currentOffer) {
          state.currentOffer.isFavorite = false;
        }
      }
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setCardsLoadingStatus, (state, action) => {
      state.isOffersLoading = action.payload;
    })
    .addCase(setFavoriteStatus, (state, action) => {
      const updatedOffer = action.payload;

      if (updatedOffer.isFavorite) {
        state.favoritesCards.push(updatedOffer);
      } else {
        state.favoritesCards = state.favoritesCards.filter((offer) => offer.id !== updatedOffer.id);
      }

      state.offerCards = state.offerCards.map((offer) =>
        offer.id === updatedOffer.id ? updatedOffer : offer
      );

      state.nearOfferCards = state.nearOfferCards.map((offer) =>
        offer.id === updatedOffer.id ? updatedOffer : offer
      );

      if (state.currentOffer?.id === updatedOffer.id) {
        state.currentOffer = updatedOffer;
      }
    });
});
