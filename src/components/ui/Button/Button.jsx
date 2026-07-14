import { ArrowRightIcon } from "@phosphor-icons/react";

const Button = ({
  children,
  className = "",
  onClick,
  disabled = false,
  type = "button",
  showArrow = true,
  ...rest
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 bg-warning-500 text-gray-900 font-semibold rounded-xs px-6 transition-all duration-200 hover:bg-warning-400 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed heading-07 ${className}`}
      {...rest}
    >
      {children}
      {showArrow && <ArrowRightIcon size={20} />}
    </button>
  );
};

export default Button;
