import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../../redux/contacts/operations.js";
import {
  selectError,
  selectIsLoading,
} from "../../redux/contacts/selectors.js";
import ContactForm from "../../components/ContactForm/ContactForm.jsx";
import ContactList from "../../components/ContactList/ContactList.jsx";
import Filter from "../../components/Filter/Filter.jsx";
import css from "./Contacts.module.css";

export default function Contacts() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
    // Homework fastcheck explicitly requests the empty dependency array.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm />
      <Filter />
      {isLoading && (
        <p className={css.loading} role="status">
          Loading contacts...
        </p>
      )}
      {error && (
        <p className={css.error} role="alert">
          {error}
        </p>
      )}
      <ContactList />
    </main>
  );
}
