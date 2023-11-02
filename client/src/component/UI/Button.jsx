import "../../styles/css/Button.css";

const Button = ({
  children,
  styles,
  fullWidth,
  outline,
  margin,
  margin2,
  type = "submit",
  onClick,
  text,
  fullHeight
}) => {
  return (
    <button
      className={`Button ${styles} ${fullWidth} ${outline} ${margin} ${margin2} ${fullHeight}`}
      type={type}
      onClick={onClick}
    >
      {text ? text : children}
    </button>
  );
};

export default Button;
