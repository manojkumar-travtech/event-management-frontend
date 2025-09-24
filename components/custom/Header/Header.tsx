// components/Header.tsx
"use client";

import React from "react";
import { Menu } from "lucide-react";

interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="h-16 flex items-center justify-between px-4 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-20 min-h-[64px]">
      <button
        className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5 text-gray-600" />
      </button>
      <h1 className="text-xl font-semibold text-gray-800">My App</h1>
      <div>{/* Optional right-side controls */}</div>
    </header>
  );
};


export default Header;
