import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, CITIES, SortItem } from '../const';
import { OfferType } from '../types';
import { changeCity, changeSorting, loadOfferCards, requireAuthorization, setCardsLoadingStatus, setError } from './action';

const initialState = {
  currentCity: CITIES[0],
  currentSort: SortItem.Popular,
  offerCards: [] as OfferType[],
  isOffersLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOfferCards, (state, action) => {
      state.offerCards = action.payload;
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
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setCardsLoadingStatus, (state, action) => {
      state.isOffersLoading = action.payload;
    });
});
