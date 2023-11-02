import "../../styles/css/InputWithLabel.css";

function InputWithLabel({
  id,
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  disabled,
  defaultValue,
  autoComplete
}) {
  return (
    <>
      <div className="label-wrapper">
        <label htmlFor={id}>{label}</label>
      </div>
      <input
        className="input"
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
      ></input>
    </>
  );
}

export default InputWithLabel;
