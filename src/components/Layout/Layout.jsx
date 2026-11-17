import AppBar from "../AppBar/AppBar.jsx";
import css from "./Layout.module.css";

export default function Layout({ children }) {
  return (
    <div className={css.shell}>
      <AppBar />
      <div className={css.content}>{children}</div>
    </div>
  );
}
