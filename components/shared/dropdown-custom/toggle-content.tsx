import IcChevronDownGrey from "assets/icons/IcChevronDownGrey";
import { HTMLProps } from "react";
interface ToggleProps {
  value: string;
  label?: string;
}

const ToggleContent = ({ value, label = "" }: ToggleProps) => {
  return (
    <div className="dropdown-custom__toggle-content">
      <div
        className={`toggle-content__text ${
          value.length ? "toggle-content__text__label-show" : ""
        }`}
      >
        <p className="toggle-content__label">{label}</p>
        <p
          className={
            value.length
              ? "toggle-content__value"
              : "toggle-content__placeholder"
          }
        >
          {value.length ? value : label}
        </p>
      </div>
      <span className="toggle-content__icon">
        <IcChevronDownGrey />
      </span>
    </div>
  );
};

export default ToggleContent;
