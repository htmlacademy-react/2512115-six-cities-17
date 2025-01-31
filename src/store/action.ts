import { createAction } from '@reduxjs/toolkit';
import { AuthData, CommentType, OfferFullType, OfferType, UserData } from '../types';
import { AppRoute, AuthorizationStatus, SortItem } from '../const';

export const changeCity = createAction<string>('app/changeCity');

export const changeSorting = createAction<SortItem>('app/changeSorting');

export const loadOfferCards = createAction<OfferFullType[]>('app/loadOfferCards');

export const loadFavoritesCards = createAction<OfferType[]>('app/loadFavoritesCards');

export const loadCurrentOffer = createAction<OfferFullType | null>('app/loadCurrentOffer');

export const loadComments = createAction<CommentType[]>('app/loadComments');

export const loadNearOfferCards = createAction<OfferFullType[]>('app/loadNearOfferCards');

export const setCardsLoadingStatus = createAction<boolean>('cards/setLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setError = createAction<string | null>('app/setError');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');

export const setAuthData = createAction<UserData | null>('user/setAuthData');
