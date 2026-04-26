'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export function Button({ 
  variant = 'primary', 
  children, 
  className = '', 
  fullWidth = false,
  ...props 
}: ButtonProps) {
  
  const baseStyles = "relative inline-flex items-center justify-center font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-200 ease-expo overflow-hidden active:scale-[0.98]";
  const widthStyles = fullWidth ? "w-full" : "";
  
  const variants = {
    primary: `
      bg-[var(--accent)] text-white
      shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_4px_12px_rgba(94,106,210,0.3)]
      hover:bg-[var(--accent-bright)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3),0_6px_20px_rgba(94,106,210,0.4)]
      border border-[var(--accent-bright)]
    `,
    secondary: `
      bg-white/[0.05] text-white
      border border-white/[0.2]
      shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]
      hover:bg-white/[0.1] hover:border-white/[0.3]
    `,
    ghost: `
      bg-transparent text-gray-400
      hover:text-white hover:bg-white/[0.05]
    `
  };

  return (
    <button 
      className={`${baseStyles} ${widthStyles} ${variants[variant]} ${className} group`}
      {...props}
    >
      {/* Shine effect for primary button */}
      {variant === 'primary' && (
        <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-[150%] transition-transform duration-700 ease-out" />
      )}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
}
