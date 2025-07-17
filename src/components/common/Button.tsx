"use client";

import { ElementType } from "react";

interface ButtonProps {
  icon?: ElementType;
  text: string;
  bgColor?: string;
  hoverColor?: string;
  fontColor?: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

const Button = ({
  icon: Icon,
  text,
  bgColor,
  hoverColor,
  fontColor,
  onClick,
  className,
  disabled, // disabled prop을 직접 받음
}: ButtonProps) => {
  const bgClass = bgColor || "bg-white";
  const hoverClass = hoverColor || "hover:bg-gray-200";
  const fontClass = fontColor || "text-gray-800";

  return (
    <button
      className={`
        flex 
        items-center
        justify-center       
        cursor-pointer
        px-4 py-2 
        rounded 
        transition 
        border border-gray-300 
        ${bgClass}
        ${hoverClass}
        ${fontClass}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className || ""}
      `}
      onClick={onClick}
      disabled={disabled} // disabled prop을 button 엘리먼트에 전달
    >
      {Icon && <Icon className="w-5 h-5 mr-2" />}
      <span className="font-medium">{text}</span>
    </button>
  );
};

export default Button;