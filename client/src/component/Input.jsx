import React from "react";

const Input = ({ label, name, id, type, placeholder, register, errors }) => {
  return (
    <>
      <label className="signup-label" htmlFor={id}>
        {label}
      </label>
      <input
        className="authInput"
        name={name}
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(name)}
      />
      {errors && <p className="signup-errors">{errors.message}</p>}
    </>
  );
};
export default Input;
