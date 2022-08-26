import { FC } from "react";
import { Route, Redirect } from "react-router";
import { useSelector } from "../../services/types/hooks";
import { useLocation } from "react-router";

interface IProtectedRouteProps {
  path: string;
  redirectPath: string;
  userData: {
    success: boolean;
    user: {
      email: string;
      name: string;
    };
    accessToken: string;
    refreshToken: string;
  } | null;
  needUserAuth: boolean;
}

export const ProtectedRoute: FC<IProtectedRouteProps> = ({
  children,
  ...rest
}) => {
  const { userData, redirectPath, needUserAuth, path } = rest;
  const { isAuthChecked } = useSelector(state => state.userReducer);

  const location = useLocation<{ from: { pathname: string }}>();

  if (!isAuthChecked) {
    return (
      <p>Подождите</p>
    )
  }

  if (needUserAuth && !userData) {
    return (
      <Route {...rest} render={({ location }) => {
          return <Redirect to={{
              pathname: redirectPath,
              state: { from: location }
          }} />
      }} />
    )
  }

  if (!needUserAuth && userData) {
    const { from } = location.state || { from: { pathname: '/' } }

    return (
      <Route {...rest} render={() => {
        return <Redirect to={from} />
      }} />
    )
  }

  return (
    <Route {...rest} render={() => {
      return children
    }} />
  ) 
}
