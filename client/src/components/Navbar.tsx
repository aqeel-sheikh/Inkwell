import { Link } from "react-router";
import { Button } from "@/components";
import { signOut, useSession } from "@/auth/auth-client";
import AuthModel from "./AuthModel";

export function Navbar() {
  const { data } = useSession();

  const isAthunticated = data?.session ? true : false;

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-primary-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="group flex items-center gap-3">
            <div className="w-10 h-10 bg-accent-coral rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <span className="font-display text-2xl font-bold text-primary-900">
              Inkwell
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-primary-700 hover:text-accent-coral transition-colors font-medium"
            >
              Stories
            </Link>
            <a
              href="#"
              className="text-primary-700 hover:text-accent-coral transition-colors font-medium"
            >
              About
            </a>

            {isAthunticated ? (
              <Button variant="default" onClick={() => signOut()}>
                Log out
              </Button>
            ) : (
              <AuthModel />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
