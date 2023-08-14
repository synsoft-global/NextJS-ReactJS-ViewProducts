import React, { FC, InputHTMLAttributes, Ref } from "react";

interface InputCustomProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  variant?: string;
  type?: "text" | "number" | "textarea";
  value: string | number;
  inputRef?: Ref<HTMLInputElement>;
  message?: string;
  messageType?: "default" | "error";
}

const InputCustom: FC<InputCustomProps> = ({
  className = "",
  label = "",
  variant = "white-filled",
  value = "",
  inputRef,
  type = "text",
  message = "",
  messageType = "default",
  ...inputProps
}) => {
  const getValueLength = () => {
    if (typeof value === "number") {
      return value;
    }
    if (typeof value === "string") {
      return value.length;
    }
    return 0;
  };

  return (
    <div className="input-custom-container">
      <div
        className={`input-custom ${
          getValueLength() > 0 ? "input-custom--has-value" : ""
        } input-custom-variant--${variant}  ${className}`}
      >
        <span className="input-custom__label">{label}</span>
        <input
          className="input-custom__input-element"
          placeholder={label}
          value={value}
          ref={inputRef}
          type={type}
          {...inputProps}
        />
      </div>
      {message && message.length ? (
        <p
          className={`input-custom-message input-custom-message-type--${messageType}`}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
};

export default InputCustom;
