import { createAction } from '@reduxjs/toolkit';
import { OfferType } from '../types';
import { AppRoute, AuthorizationStatus, SortItem } from '../const';

export const changeCity = createAction<string>('app/changeCity');

export const changeSorting = createAction<SortItem>('app/changeSorting');

export const loadOfferCards = createAction<OfferType[]>('app/loadOffers');

export const setCardsLoadingStatus = createAction<boolean>('cards/setLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setError = createAction<string | null>('app/setError');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');
