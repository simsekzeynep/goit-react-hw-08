import { useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filters/slice.js";
import { selectFilter } from "../../redux/filters/selectors.js";
import css from "./Filter.module.css";

export default function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const filterId = useId();

  const handleChange = (event) => dispatch(changeFilter(event.target.value));

  return (
    <div className={css.container}>
      <label className={css.label} htmlFor={filterId}>
        Find contacts by name
      </label>
      <input
        id={filterId}
        className={css.input}
        type="search"
        value={filter}
        onChange={handleChange}
        placeholder="Search contacts"
      />
    </div>
  );
}
