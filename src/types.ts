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

export type OfferCardType = 'favorites' | 'cities' | 'near-places';

export type RatingType = number | null;

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
