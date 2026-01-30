import { Link } from "react-router";
import { Button } from "@/components";
import { signOut, useSession } from "@/auth/auth-client";
import AuthModel from "./AuthModel";
import { BookOpen, LayoutDashboard } from "lucide-react";

export function Navbar() {
  const { data } = useSession();

  const isAuthenticated = data?.session ? true : false;

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
            <div className="flex items-center gap-8">
              <Link
                to="/"
                className="font-medium text-stone-700 transition-colors hover:text-stone-900"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Stories
              </Link>
              <a
                href="#about"
                className="font-medium text-stone-700 transition-colors hover:text-stone-900"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                About
              </a>
              <a
                href={import.meta.env.VITE_DASHBOARD_URL}
                className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2 font-medium text-stone-700 transition-all duration-300 hover:border-stone-300 hover:bg-stone-50"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
                rel="noopener noreferrer"
                target="_blank"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
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
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
