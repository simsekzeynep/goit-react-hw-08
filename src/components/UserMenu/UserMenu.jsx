import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/auth/operations.js";
import { selectUser } from "../../redux/auth/selectors.js";
import css from "./UserMenu.module.css";

export default function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    setError("");
    setIsLoggingOut(true);
    const result = await dispatch(logOut());
    if (logOut.rejected.match(result))
      setError(result.payload || "Could not log out.");
    setIsLoggingOut(false);
  };

  return (
    <div className={css.menu}>
      <span className={css.greeting}>
        Welcome, <strong>{user.name || "friend"}</strong>
      </span>
      <button
        type="button"
        className={css.button}
        onClick={handleLogout}
        disabled={isLoggingOut}
      >
        {isLoggingOut ? "Logging out..." : "Log out"}
      </button>
      {error && (
        <span className={css.error} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
