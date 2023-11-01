import "./Button.css";

const Button = ({
  children,
  styles,
  fullWidth,
  outline,
  margin,
  margin2,
  type = "submit",
  onClick
}) => {
  return (
    <button
      className={`Button ${styles} ${fullWidth} ${outline} ${margin} ${margin2}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
