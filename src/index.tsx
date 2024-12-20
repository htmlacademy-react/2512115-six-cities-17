import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { OFFERS_MOCK } from './mocks/offers';
import { COMMENTS_MOCK } from './mocks/comments';

const Settings = {
  OffersCount: 5,
} as const;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      offers={OFFERS_MOCK}
      comments={COMMENTS_MOCK}
      offersCount={Settings.OffersCount}
    />
  </React.StrictMode>
);
