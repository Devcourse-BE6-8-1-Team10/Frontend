"use client";

import { ElementType } from "react";

interface ButtonProps {
  icon?: ElementType;
  text: string;
  onClick?: () => void;
  className?: string;
}

const Button = ({ icon: Icon, text, onClick, className }: ButtonProps) => {
  return (
    <button
      className={`flex items-center px-4 py-2 rounded hover:bg-gray-200 transition border border-gray-300 ${
        className || ""
      }`}
      onClick={onClick}
    >
      {Icon && <Icon className="w-5 h-5 text-gray-800 mr-2" />}
      <span className="text-gray-800 font-medium">{text}</span>
    </button>
  );
};

export default Button;
