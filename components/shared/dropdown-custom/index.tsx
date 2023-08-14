import React, {
  HTMLProps,
  ReactEventHandler,
  ReactNode,
  RefObject,
} from "react";
import Dropdown, { DropdownProps } from "react-bootstrap/Dropdown";
import ToggleContent from "./toggle-content";

interface DropdownCustomProps {
  label?: string;
  value: string;
  children: ReactNode;
  variant?: "white";
  disabled?: boolean;
  inputRef?: RefObject<HTMLInputElement>;
  inputProps?: HTMLProps<HTMLInputElement>;
  toggleProps?: DropdownProps & {
    onSelect?: ReactEventHandler<HTMLButtonElement>;
  };
}

const DropdownCustom: React.FC<DropdownCustomProps> = ({
  label = "",
  value,
  children,
  variant = "white",
  disabled = false,
  inputRef,
  inputProps = {},
  toggleProps = {},
}) => {
  return (
    <Dropdown className={`dropdown-custom dropdown-custom-variant--${variant}`}>
      <Dropdown.Toggle disabled={disabled} {...toggleProps}>
        <ToggleContent label={label} value={value} />
        <input type="hidden" ref={inputRef} {...inputProps} readOnly />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <div className="dropdown-custom__content">{children}</div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownCustom;
