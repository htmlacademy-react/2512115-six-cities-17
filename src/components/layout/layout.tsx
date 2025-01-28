import {Link, Outlet, useLocation} from 'react-router-dom';
import { AppRoute } from '../../const';
import { Helmet } from 'react-helmet-async';
import { logoutAction } from '../../store/api-actions';

function Layout() {
  const {pathname} = useLocation();
  const headerRightSide = pathname as AppRoute !== AppRoute.Login;
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
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to={AppRoute.Main}>
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </Link>
            </div>
            {headerRightSide && (
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">
                        Oliver.conner@gmail.com
                      </span>
                      <span className="header__favorite-count">3</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <Link
                      onClick={(evt) => {
                        evt.preventDefault();
                        dispatch(logoutAction ());
                      }}
                      className="header__nav-link"
                      to="/"
                    >
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}

export default Layout;
