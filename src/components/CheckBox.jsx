import React from "react";
import PropTypes from "prop-types";

const CheckBox = (props) => {
  return (
    <div className="custom-checkbox">
      <input
        type="radio"
        id={props.value}
        value={props.value}
        name="category"
        // checked={props.checked}
        onChange={props.onChange}
        style={{ color: "#4267b2" }}
      />
      <label htmlFor={props.value} style={{ fontSize: "15px" }}>
        {props.label}
      </label>
    </div>
  );
};

CheckBox.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool,
};

export default CheckBox;
