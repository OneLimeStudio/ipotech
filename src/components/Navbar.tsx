"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="flex items-center justify-between text-white p-4 rounded-xl shadow"
      style={{ background: "rgb(21,39,51)" }}
    >
      {/* Logo + Text side by side */}
      <div className="flex items-center space-x-2">
        <img
          src="/logo.jpg"
          alt="Logo"
          className="w-8 h-8"
        />
        <h1 className="font-bold text-lg"style={{color:"#EECC50"}}>IPO_TECH</h1>
      </div>

      {/* Hamburger for mobile */}
      <button
        className="md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Navigation links */}
      <ul
        className={`flex flex-col md:flex-row gap-4 ${
          isOpen ? "block" : "hidden md:flex"
        }`}
      >
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}
