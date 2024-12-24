import { createReducer } from '@reduxjs/toolkit';
import { CITIES } from '../const';
import { OfferType } from '../types';
import { loadOfferCards } from './action';

const initialState = {
  currentCity: CITIES[0],
  offerType: [] as OfferType[],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOfferCards, (state, action) => {
      state.offerType = action.payload;
    });
});
