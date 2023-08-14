import React from "react";
import IcSpin from "assets/icons/IcSpin";
import Link from "next/link";

interface ButtonCustomProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  disabled?: boolean;
  variant?:
    | "black"
    | "black--border"
    | "black--underline"
    | "white"
    | "white--border"
    | "red--underline"
    | "gray--border"
    | "gray--underline"
    | "disabled"
    | "icon"
    | "orange";
  textTransform?: "uppercase" | "lowercase" | "capitalize" | "none";
  className?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children?: React.ReactNode;
  href?: string;
  fullwidth?: boolean;
  textFontSize?: "fs-12" | "fs-13" | "fs-14";
}
const ButtonCustom: React.FC<ButtonCustomProps> = ({
  loading = false,
  disabled = false,
  variant = "black",
  textTransform = "uppercase",
  textFontSize = "fs-14",
  className = "",
  startIcon,
  endIcon,
  children,
  fullwidth = false,
  href,
  ...props
}: ButtonCustomProps) => {
  const getDisabledClassNameByVariant = (variant = "") => {
    if (disabled) {
      if (variant.includes("border")) return "button--disabled--border";
      if (variant.includes("underline")) return "button--disabled--underline";
      if (variant.includes("icon")) return "button--disabled--icon";
      return "button--disabled";
    }
    return "";
  };

  const buttonClassName = `button button-${variant} button-text--${textTransform} ${getDisabledClassNameByVariant(
    variant
  )} ${loading ? "button--loading" : ""} ${
    fullwidth ? "w-100" : ""
  } ${textFontSize} ${className}`;

  if (href && href !== "#" && disabled === false && loading === false) {
    return (
      <Link href={href} className={`${buttonClassName} button--link`}>
        {loading && <IcSpin className="button__icon-spinning" />}
        {startIcon && <span className="button__start-icon">{startIcon}</span>}
        <div className="button__content">{children}</div>
        {endIcon && <span className="button__end-icon">{endIcon}</span>}
      </Link>
    );
  }

  return (
    <button
      className={buttonClassName}
      disabled={disabled || loading || href === "#"}
      {...props}
    >
      {loading && <IcSpin className="button__icon-spinning" />}
      {startIcon && <span className="button__start-icon">{startIcon}</span>}
      <div className="button__content">{children}</div>
      {endIcon && <span className="button__end-icon">{endIcon}</span>}
    </button>
  );
};

export default ButtonCustom;
