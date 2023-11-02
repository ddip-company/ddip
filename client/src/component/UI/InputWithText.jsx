import "../../styles/css/InputWithLabel.css";

function InputWithText({
  name,
  placeholder,
  height,
  value,
  onChange,
  autoComplete
}) {
  return (
    <input
      className="inputText"
      name={name}
      placeholder={placeholder}
      height={height}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
    />
  );
}

export default InputWithText;
