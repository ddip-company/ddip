import { forwardRef } from "react";
import "../../styles/css/Dropdown.css";

function Dropdown(
  { label = "라벨", isOpen, selected, onToggle, onSelect, options },
  ref
) {
  return (
    <div className="dropdown">
      <div className="label-wrapper">
        <label>{label}</label>
      </div>
      <div className="dropdown-wrapper" ref={ref}>
        <div
          className={`display-box ${isOpen ? "open" : ""}`}
          role="presentation"
          onClick={onToggle}
        >
          <p className={`selected ${selected.value ? "has-value" : ""}`}>
            {selected.name}
          </p>
          <div className="image-wrapper">
            <img
              src={process.env.PUBLIC_URL + "/img/arrow-down.svg"}
              alt="arrow-down"
            />
          </div>
        </div>
        {isOpen && (
          <ul className="option-list">
            {options.map((option) => (
              <li
                key={option.name}
                role="presentation"
                className={`option ${
                  selected.name === option.name ? "active" : ""
                }`}
                onClick={() => onSelect(option.name, option.value)}
              >
                {option.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default forwardRef(Dropdown);
