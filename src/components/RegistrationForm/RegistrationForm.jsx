import { useId } from "react";
import { useDispatch } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { register } from "../../redux/auth/operations.js";
import css from "./RegistrationForm.module.css";

const initialValues = { name: "", email: "", password: "" };
const schema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Enter at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .trim()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(7, "Use at least 7 characters")
    .required("Password is required"),
});

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();

  const handleSubmit = async (values, { setStatus }) => {
    setStatus(null);
    const credentials = {
      ...values,
      name: values.name.trim(),
      email: values.email.trim(),
    };

    const result = await dispatch(register(credentials));
    if (register.rejected.match(result)) {
      setStatus(result.payload || "Registration failed. Please try again.");
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
            <label htmlFor={nameId}>Name</label>
            <Field
              className={css.input}
              id={nameId}
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
            />
            <ErrorMessage className={css.error} name="name" component="span" />
          </div>
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
              autoComplete="new-password"
              placeholder="At least 7 characters"
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
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
