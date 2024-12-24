import { createAction } from '@reduxjs/toolkit';
import { OfferType } from '../types';

export const changeCity = createAction('app/changeCity');

export const loadOfferCards = createAction<OfferType[]>('app/loadOffers');
