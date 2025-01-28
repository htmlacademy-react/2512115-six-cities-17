import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { OFFERS_MOCK } from './mocks/offers';
import { COMMENTS_MOCK } from './mocks/comments';
import { Provider } from 'react-redux';
import { store } from './store';
import { loadOfferCards } from './store/action';
import { OFFERS_FULL_MOCK } from './mocks/offers-full';
import ErrorMessage from './components/error-message/error-message';
import { checkAuthAction, fetchCards } from './store/api-actions';

store.dispatch(fetchCards());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(loadOfferCards(OFFERS_MOCK));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App
        offers={OFFERS_MOCK}
        offerFull={OFFERS_FULL_MOCK}
        comments={COMMENTS_MOCK}
      />
    </Provider>
  </React.StrictMode>
);
