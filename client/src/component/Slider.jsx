import React from "react";
import PropTypes from "prop-types";

function Slider(props) {
  const { onPageChange } = props;

  return (
    <div className="pagination">
      <ul>
        <li
          className="pagination-item"
          onClick={() => onPageChange("prev")}
        ></li>
        <li
          className="pagination-item"
          onClick={() => onPageChange("next")}
        ></li>
      </ul>
    </div>
  );
}

Slider.propTypes = {
  onPageChange: PropTypes.func.isRequired
};

export default Slider;
