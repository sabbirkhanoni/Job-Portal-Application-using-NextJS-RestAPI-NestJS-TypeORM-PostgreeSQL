"use client";
import Link from "next/link";
import { useEffect } from "react";

const Header = ({ title }: { title: string }) => {

  useEffect(() => {
    document.title = title;
  }, [title]);


  return (
    <>
    <div className="flex items-center justify-between px-6 py-3 bg-gradient-to-l from-blue-600 to-cyan-500 shadow-sm">
      
      <div className="flex justify-center">
          <img
            src="/jobLogo.png"
            alt="Job Board Logo"
            className="w-10 h-10 object-scale-down"
          />
        </div>

      <nav>
        <ul className="flex items-center gap-3">
          <li>
            <Link
              href="/"
              className="text-sm font-medium text-blue-600 bg-white px-4 py-1.5 rounded-full shadow-md hover:shadow-lg hover:bg-blue-50 transition"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-sm font-medium text-blue-600 bg-white px-4 py-1.5 rounded-full shadow-md hover:shadow-lg hover:bg-blue-50 transition"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-sm font-medium text-blue-600 bg-white px-4 py-1.5 rounded-full shadow-md hover:shadow-lg hover:bg-blue-50 transition"
            >
              Contact
            </Link>
          </li>

          <li>
            <Link
              href="/login"
              className="text-sm font-semibold text-white bg-blue-500 px-4 py-1.5 rounded-full shadow-lg hover:bg-blue-600 transition"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              href="/register"
              className="text-sm font-semibold text-white bg-cyan-500 px-4 py-1.5 rounded-full shadow-lg hover:bg-cyan-600 transition"
            >
              Register
            </Link>
          </li>
        </ul>
      </nav>
    </div>

    </>
  );
};

export default Header;
