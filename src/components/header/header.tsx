import { Link, useLocation } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { UserData } from '../../types';

function Header(): JSX.Element {
  const {pathname} = useLocation();
  const headerRightSide = pathname as AppRoute !== AppRoute.Login;
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const userData: UserData | null = useAppSelector((state) => state.userData);
  const dispatch = useAppDispatch();
  const favoritesCards = useAppSelector((state) => state.favoritesCards);

  return (
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
                {authorizationStatus === AuthorizationStatus.Auth ? (
                  <>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                        <div
                          className="header__avatar-wrapper user__avatar-wrapper"
                          style={{backgroundImage: userData?.avatarUrl ? `url(${userData?.avatarUrl})` : '', borderRadius: '50%'}}
                        />
                        <span className="header__user-name user__name">
                          {userData?.email}
                        </span>
                        <span className="header__favorite-count">{favoritesCards.length}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <Link
                        onClick={(evt) => {
                          evt.preventDefault();
                          dispatch(logoutAction());
                        }}
                        className="header__nav-link"
                        to="/"
                      >
                        <span className="header__signout">Sign out</span>
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
