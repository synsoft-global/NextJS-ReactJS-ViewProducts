import React from "react";
import { Form } from "react-bootstrap";

const CheckboxCustom = ({ className = "", ...props }) => {
  return (
    <Form.Check
      className={`pp-checkbox ${className}`}
      type="checkbox"
      {...props}
    />
  );
};

export default CheckboxCustom;
