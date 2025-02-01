import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';


type PrivateRouteProps = {
  children: JSX.Element;
  reversed?: boolean;
}

function PrivateRoute({ children, reversed = false }: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  return (
    authorizationStatus === (reversed ? AuthorizationStatus.NoAuth : AuthorizationStatus.Auth)
      ? children
      : <Navigate to={reversed ? AppRoute.Main : AppRoute.Login} replace />
  );
}

export default PrivateRoute;
