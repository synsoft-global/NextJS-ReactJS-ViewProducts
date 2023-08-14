import React, { useState } from "react";
import AsyncSelect from "react-select/async";
const AsyncSelectCustom = ({
  className = "",
  label = "",
  variant = "white-filled",
  message = "",
  messageType = "default",
  onChange = () => {},
  ...asyncProps
}: any) => {
  const [isOpen, setisOpen] = useState(false);
  const handleOnchange = (event) => {
    setisOpen(false);
    onChange(event);
  };
  return (
    <div
      className={`async-select-custom ${
        isOpen ? "async-select-custom--is-open" : ""
      } async-select-custom-variant--${variant} ${className}`}
    >
      <div className="async-select-custom__container">
        <span className="async-select-custom__label">{label}</span>
        <AsyncSelect
          isClearable={true}
          onMenuOpen={() => setisOpen(true)}
          onMenuClose={() => setisOpen(false)}
          className="async-select-custom__select-element-container"
          classNamePrefix="async-select-custom__select-element"
          onChange={handleOnchange}
          {...asyncProps}
        />
      </div>
      {message && message.length ? (
        <p
          className={`async-select-custom-message async-select-custom-message-type--${messageType}`}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
};

export default AsyncSelectCustom;
