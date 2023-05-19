import "./Button.css";

const Button = ({ children, styles, fullWidth, onClick }) => {
  return (
    <button className={`Button ${styles} ${fullWidth}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
