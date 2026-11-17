import { useId } from "react";
import { useDispatch } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { logIn } from "../../redux/auth/operations.js";
import css from "./LoginForm.module.css";

const initialValues = { email: "", password: "" };
const schema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const emailId = useId();
  const passwordId = useId();

  const handleSubmit = async (values, { setStatus }) => {
    setStatus(null);
    const result = await dispatch(logIn(values));
    if (logIn.rejected.match(result)) {
      setStatus(result.payload || "Log in failed. Please try again.");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, status }) => (
        <Form className={css.form} noValidate>
          <div className={css.field}>
            <label htmlFor={emailId}>Email</label>
            <Field
              className={css.input}
              id={emailId}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
            />
            <ErrorMessage className={css.error} name="email" component="span" />
          </div>
          <div className={css.field}>
            <label htmlFor={passwordId}>Password</label>
            <Field
              className={css.input}
              id={passwordId}
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Your password"
            />
            <ErrorMessage
              className={css.error}
              name="password"
              component="span"
            />
          </div>
          {status && (
            <p role="alert" className={css.error}>
              {status}
            </p>
          )}
          <button className={css.button} type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Log in"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
