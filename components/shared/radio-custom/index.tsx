import React from "react";
import Form from "react-bootstrap/Form";

const RadioCustom = ({ className = "", name, value, ...props }) => {
  return (
    <Form.Check
      className={`pp-radio ${className}`}
      type={"radio"}
      id={`${name}--${value}`}
      name={name}
      value={value}
      {...props}
    />
  );
};

export default RadioCustom;
