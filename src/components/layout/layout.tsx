import {Outlet, useLocation} from 'react-router-dom';
import { AppRoute } from '../../const';
import { Helmet } from 'react-helmet-async';
import Header from '../header/header';

function Layout() {
  const {pathname} = useLocation();
  let className = 'page';
  let titleName = '6 cities:';

  if (pathname as AppRoute === AppRoute.Main) {
    className += '  page--gray page--main';
    titleName += ' Main';
  } else if (pathname as AppRoute === AppRoute.Login) {
    className += '  page--gray page--login';
    titleName += ' Login';
  } else if (pathname as AppRoute === AppRoute.Favorites) {
    titleName += ' Favorites';
  } else if ((pathname as AppRoute).includes(AppRoute.Offer.replace(':id', ''))) {
    titleName += ' Offer';
  } else if (pathname === '/*') {
    titleName += ' Error 404';
  }
  return (
    <div className={className}>
      <Helmet>
        <title>{titleName}</title>
      </Helmet>
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
