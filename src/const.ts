export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  DevOfferLogged = '/offer-logged/:id',
  DevOfferNotLogged = '/offer-not-logged/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
