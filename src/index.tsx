import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { OFFERS_MOCK } from './mocks/offers';
import { COMMENTS_MOCK } from './mocks/comments';
import { Provider } from 'react-redux';
import { store } from './store';
import { loadOfferCards } from './store/action';
import { OFFERS_FULL_MOCK } from './mocks/offers-full';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(loadOfferCards(OFFERS_MOCK));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        offers={OFFERS_MOCK}
        offerFull={OFFERS_FULL_MOCK}
        comments={COMMENTS_MOCK}
      />
    </Provider>
  </React.StrictMode>
);
