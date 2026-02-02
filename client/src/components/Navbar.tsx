import { Link } from "react-router";
import { Button } from "@/components";
import { signOut, useSession } from "@/auth/auth-client";
import AuthModel from "./AuthModel";
import { ArrowRight, BookOpen, LayoutDashboard } from "lucide-react";
import { useRef } from "react";

export function Navbar() {
  const { data } = useSession();
  const isAuthenticated = data?.session ? true : false;
  const hamburgerMenuRef = useRef<HTMLDivElement>(null);

  const handleHamburgerClick = () => {
    const hamburger = document.querySelector(".hamburger");

    hamburger?.childNodes.forEach((child, index) => {
      const elm = child as HTMLElement;
      if (index === 0) elm.classList.toggle("hamburger-line1");
      else if (index === 1) {
        elm.classList.toggle("hamburger-line2");
      } else if (index === 2) {
        elm.classList.toggle("hamburger-line3");
      }
    });
    const menu = hamburgerMenuRef?.current;
    if (menu) {
      menu.classList.toggle("active");
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-stone-200/60 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="group flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-700 shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:rotate-3">
                <BookOpen className="h-6 w-6 text-white" strokeWidth={2} />
              </div>
              <span
                className="text-2xl font-light tracking-tight text-stone-900"
                style={{ fontFamily: "'Crimson Pro', serif" }}
              >
                Inkwell
              </span>
            </Link>
            {/* Navigation Links */}
            <div className="flex items-center gap-4 sm:gap-8">
              <Link
                to="/"
                className="sm:block hidden font-medium text-stone-700 transition-colors hover:text-stone-900"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Stories
              </Link>
              <a
                href="#about"
                className="sm:block hidden font-medium text-stone-700 transition-colors hover:text-stone-900"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                About
              </a>
              <a
                href={import.meta.env.VITE_DASHBOARD_URL}
                className="inline-flex max-[490px]:hidden items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2 font-medium text-stone-700 transition-all duration-300 hover:border-stone-300 hover:bg-stone-50"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
                rel="noopener noreferrer"
                target="_blank"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </a>
              {/* Authenticated User Actions */}
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <Button
                    variant="default"
                    onClick={() => signOut()}
                    className="rounded-xl border-0 bg-linear-to-br from-stone-900 via-stone-800 to-stone-900 font-medium text-white transition-all duration-300 hover:shadow-sm cursor-pointer"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Log out
                  </Button>
                </div>
              ) : (
                <AuthModel />
              )}
              {/* Hamburger */}
              <div
                className="hamburger sm:hidden flex flex-col gap-[6px]"
                onClick={handleHamburgerClick}
              >
                <span className="h-[3px] w-6 bg-stone-700 rounded-full transition-all duration-300"></span>
                <span className="h-[3px] w-6 bg-stone-700 rounded-full transition-all duration-300"></span>
                <span className="h-[3px] w-6 bg-stone-700 rounded-full transition-all duration-300"></span>
              </div>
            </div>
          </div>
        </div>
        {/* Hamburger Menu */}
        <div
          ref={hamburgerMenuRef}
          className="hamburgerMenu sm:hidden flex flex-col bg-white/95 backdrop-blur-xl shadow-[0px_1px_2px_#00000010] absolute w-full left-0 top-full px-6 py-6"
        >
          {/* Navigation Links */}
          <div className="flex flex-col gap-3 pb-3">
            <Link
              to="/"
              className="group flex items-center gap-3 font-medium text-stone-700 rounded-xl transition-all duration-200 hover:bg-stone-50 hover:text-stone-900 active:scale-[0.98]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <span className="text-base">Stories</span>
            </Link>

            <a
              href="#about"
              className="group flex items-center gap-3 font-medium text-stone-700 rounded-xl transition-all duration-200 hover:bg-stone-50 hover:text-stone-900 active:scale-[0.98]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <span className="text-base">About</span>
            </a>
          </div>

          {/* Divider */}
          <div className="hidden max-[490px]:block h-px bg-linear-to-r from-transparent via-stone-200 to-stone-100"></div>

          {/* Dashboard Link */}
          <div className="pt-3">
            <a
              href={import.meta.env.VITE_DASHBOARD_URL}
              className="hidden max-[490px]:flex w-fit items-center justify-center gap-2.5 font-medium text-stone-700 transition-all duration-200 hover:border-stone-300 hover:shadow-sm active:scale-[0.98]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>Dashboard</span>
              <ArrowRight className="h-4 w-4" />
              {/* <LayoutDashboard className="h-4 w-4" /> */}
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
