import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
import css from "./Navigation.module.css";

export default function Navigation() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navClass = ({ isActive }) =>
    isActive ? `${css.link} ${css.active}` : css.link;

  return (
    <nav className={css.nav} aria-label="Main navigation">
      <NavLink to="/" end className={css.brand}>
        Phonebook
      </NavLink>
      <NavLink to="/" end className={navClass}>
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink to="/contacts" className={navClass}>
          Contacts
        </NavLink>
      )}
    </nav>
  );
}
