import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn, selectToken } from "../../redux/auth/selectors.js";

export default function RestrictedRoute({
  component: Component,
  redirectTo = "/",
}) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = useSelector(selectToken);

  if (token && !isLoggedIn)
    return <p role="status">Checking your session...</p>;
  return isLoggedIn ? <Navigate to={redirectTo} replace /> : Component;
}
