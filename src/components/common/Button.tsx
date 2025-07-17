"use client";

import { ElementType } from "react";

interface ButtonProps {
  icon?: ElementType;
  text: string;
  bgColor?: string;
  hoverColor?: string;
  fontColor?: string;
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
        ${className || ""}
      `}
      onClick={onClick}
    >
      {Icon && <Icon className="w-5 h-5 mr-2" />}
      <span className="font-medium">{text}</span>
    </button>
  );
};

export default Button;