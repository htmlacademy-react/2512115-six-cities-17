import { createReducer } from '@reduxjs/toolkit';
import { CITIES, SortItem } from '../const';
import { OfferType } from '../types';
import { changeCity, changeSorting, loadOfferCards } from './action';

const initialState = {
  currentCity: CITIES[0],
  currentSort: SortItem.Popular,
  offerCards: [] as OfferType[],
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
    });
});
