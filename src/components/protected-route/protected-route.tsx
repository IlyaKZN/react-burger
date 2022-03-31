import { FC } from "react";
import { Route, Redirect } from "react-router";
import { useSelector } from "../../services/types/hooks";
import { useRouteMatch, useHistory, useLocation } from "react-router";

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

interface ILocationState {
  from: string
}

export const ProtectedRoute: FC<IProtectedRouteProps> = ({
  children,
  ...rest
}) => {
  const { userData, redirectPath, needUserAuth, path } = rest;
  const { isAuthChecked } = useSelector(state => state.userReducer);
  const history = useHistory();
  const { url } = useRouteMatch();
  const location = useLocation<ILocationState>();
  const locationState = location.state;

  if (!isAuthChecked) {
    return (
      <p>Подождите</p>
    )
  }

  

  //login
  if (userData && !needUserAuth) {
    return (
      <Redirect to={{
        pathname: `${locationState ? locationState.from : '/'}`,
        state: { from: path }
      }} />
    )
  }

  if (!userData && !needUserAuth) {
    return (
      <Route
        {...rest}
        render={() =>
          children
        }
        exact
      />
    );
  }


  //profile
  if (!isAuthChecked && needUserAuth) {
    return (
      <Redirect to={{
        pathname: `${redirectPath}`,
        state: { from: path }
      }} />
    )
  }

  if (userData && needUserAuth ) {
    return (
      <Route
        {...rest}
        render={() =>
          children
        }
        exact
      />
    )
  }

  return (
    <Redirect to={{
      pathname: `${redirectPath}`,
      state: { from: path }
    }} />
  );
};
