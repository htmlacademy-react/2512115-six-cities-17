export type LocationType = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type CityName = string;

export type CityType = {
  name: CityName;
  location: LocationType;
};

export type OfferType = {
  id: string;
  title: string;
  type: string;
  price: number;
  previewImage: string;
  city: CityType;
  location: LocationType;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
};

export type OfferFullType = {
    id: string;
    title: string;
    type: string;
    price: number;
    city: {
      name: string;
      location: {
      latitude: number;
      longitude: number;
      zoom: number;
      };
    };
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
      };
    isFavorite: boolean;
    isPremium: boolean;
    rating: number;
    description: string;
    bedrooms: number;
    goods: [string];
    host: {
      name: string;
      avatarUrl: string;
      isPro: boolean;
      };
    images: [string];
    maxAdults: number;
};

export type OfferCardType = 'favorites' | 'cities' | 'near-places';

export type RatingType = number;

export type CommentType = {
  id: string;
  date: string;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  comment: string;
  rating: number;
};

export type UploadCommentData = {
  offerId: string;
  comment: string;
  rating: number;
}

import { store } from './store';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AuthData = {
  login: string;
  password: string;
};

export type UserData = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
};

