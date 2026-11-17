import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
import css from "./Home.module.css";

export default function Home() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <main className={css.hero}>
      <p className={css.eyebrow}>YOUR PERSONAL CONTACT SPACE</p>
      <h1 className={css.title}>Your contacts, all in one place.</h1>
      <p className={css.description}>
        Create your own private address book, find people quickly, and keep your
        contacts in sync.
      </p>
      <Link className={css.button} to={isLoggedIn ? "/contacts" : "/register"}>
        {isLoggedIn ? "Open my contacts" : "Get started"}
      </Link>
    </main>
  );
}
