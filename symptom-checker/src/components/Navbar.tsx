'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 glass glass-sm backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="text-2xl">🏥</div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                MediAssist
              </span>
              <span className="text-xs text-gray-400">AI Health Checker</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            <Link
              href="/history"
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
            >
              History
            </Link>
            <Link
              href="/#about"
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
            >
              About
            </Link>
            <button className="px-6 py-2 rounded-lg bg-gradient-primary text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-white/10 animate-slide-in-left">
            <Link
              href="/"
              className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Home
            </Link>
            <Link
              href="/history"
              className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              History
            </Link>
            <Link
              href="/#about"
              className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              About
            </Link>
            <button className="w-full mt-2 px-4 py-2 rounded-lg bg-gradient-primary text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300">
              Get Started
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
