
import React from "react";
import classNames from "classnames";

export const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
  variant = "default",
  size = "default",
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-md transition focus:outline-none";

  const variantStyles = {
    default: "bg-green-600 text-white hover:bg-green-700",
    outline: "border border-gray-300 text-gray-800 hover:bg-gray-100",
    ghost: "text-gray-800 hover:bg-gray-100",
    destructive: "bg-red-600 text-white hover:bg-red-700",
  };

  const sizeStyles = {
    default: "px-4 py-2 text-sm",
    sm: "px-3 py-1.5 text-sm",
    icon: "p-2",
  };

  const combined = classNames(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  return (
    <button type={type} onClick={onClick} className={combined} {...props}>
      {children}
    </button>
  );
};
