import "./form-input.styles.scss";

const FormInput = ({ handleChange, label, ...otherProps }) => {
  return (
    <div className="group">
      <input className="form-input" onChange={handleChange} {...otherProps} />
      {label ? (
        <label // Якщо є значення label, тоді ми показуємо лейбл.
          className={`${
            otherProps.value.length ? "shrink" : "" // І якщо в полі введення є якісь значення то додаємо shrink
          } form-input-label`} // а якщо немає, тоді постійно показуємо з form-input-label
        >
          {label}
        </label>
      ) : null}
    </div>
  );
};

export default FormInput;
