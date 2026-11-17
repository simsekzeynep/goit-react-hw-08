import { useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { addContact } from "../../redux/contacts/operations.js";
import { selectIsLoading } from "../../redux/contacts/selectors.js";
import css from "./ContactForm.module.css";

const initialValues = {
  name: "",
  number: "",
};

const contactSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name cannot exceed 50 characters")
    .required("Name is required"),
  number: Yup.string()
    .trim()
    .min(3, "Number must be at least 3 characters")
    .max(50, "Number cannot exceed 50 characters")
    .required("Number is required"),
});

export default function ContactForm() {
  const dispatch = useDispatch();
  const loading = useSelector(selectIsLoading);
  const nameId = useId();
  const numberId = useId();

  const handleSubmit = async (values, { resetForm }) => {
    const action = await dispatch(
      addContact({
        name: values.name.trim(),
        number: values.number.trim(),
      }),
    );

    // Keep input values if the API request fails so the user can retry.
    if (addContact.fulfilled.match(action)) {
      resetForm();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={contactSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={css.form} noValidate>
          <div className={css.fieldGroup}>
            <label className={css.label} htmlFor={nameId}>
              Name
            </label>
            <Field
              className={css.input}
              id={nameId}
              name="name"
              type="text"
              placeholder="Enter a name"
              autoComplete="name"
            />
            <ErrorMessage className={css.error} name="name" component="span" />
          </div>

          <div className={css.fieldGroup}>
            <label className={css.label} htmlFor={numberId}>
              Number
            </label>
            <Field
              className={css.input}
              id={numberId}
              name="number"
              type="tel"
              placeholder="Enter a phone number"
              autoComplete="tel"
            />
            <ErrorMessage
              className={css.error}
              name="number"
              component="span"
            />
          </div>

          <button
            className={css.button}
            type="submit"
            disabled={isSubmitting || loading}
          >
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
}
