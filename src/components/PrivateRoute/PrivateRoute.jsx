import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  selectIsLoggedIn,
  selectIsRefreshing,
  selectToken,
} from "../../redux/auth/selectors.js";

export default function PrivateRoute({
  component: Component,
  redirectTo = "/",
}) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const token = useSelector(selectToken);

  // A rehydrated token needs to be checked before redirecting on hard refresh.
  if (isRefreshing || (token && !isLoggedIn)) {
    return <p role="status">Checking your session...</p>;
  }
  return isLoggedIn ? Component : <Navigate to={redirectTo} replace />;
}
