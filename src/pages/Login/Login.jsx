import LoginForm from "../../components/LoginForm/LoginForm.jsx";
import css from "./Login.module.css";

export default function Login() {
  return (
    <main className={css.page}>
      <h1 className={css.title}>Welcome back</h1>
      <p className={css.subtitle}>Log in to your personal phonebook.</p>
      <LoginForm />
    </main>
  );
}
