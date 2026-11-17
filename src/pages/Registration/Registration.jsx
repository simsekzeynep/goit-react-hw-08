import RegistrationForm from "../../components/RegistrationForm/RegistrationForm.jsx";
import css from "./Registration.module.css";

export default function Registration() {
  return (
    <main className={css.page}>
      <h1 className={css.title}>Create an account</h1>
      <p className={css.subtitle}>Keep your contacts private and organized.</p>
      <RegistrationForm />
    </main>
  );
}
