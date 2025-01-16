import { createAction } from '@reduxjs/toolkit';
import { OfferType } from '../types';
import { SortItem } from '../const';

export const changeCity = createAction<string>('app/changeCity');

export const changeSorting = createAction<SortItem>('app/changeSorting');

export const loadOfferCards = createAction<OfferType[]>('app/loadOffers');
