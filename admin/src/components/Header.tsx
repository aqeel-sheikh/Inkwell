import { useState } from "react";
import { useSession, signOut } from "@/auth/authClient";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ChevronDown } from "lucide-react";

export const Header = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <>
      <style>{`
        .header-dropdown {
          animation: slideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <nav className="sticky top-0 z-50 flex flex-wrap gap-4 items-center justify-between border-b border-stone-200/60 bg-white/95 px-6 py-4 backdrop-blur-xl md:rounded-t-xl">
        <div className="flex items-center gap-5">
          <SidebarTrigger />

          <form className=" items-center gap-2 hidden md:flex">
            <div className="relative">
              <svg
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <Input
                type="search"
                name="searchGlobal"
                id="searchGlobal"
                placeholder="Search your posts..."
                className="min-w-0 border-stone-200 bg-white pl-10 pr-4 transition-all duration-300 placeholder:text-stone-400 focus:border-stone-400 sm:w-64"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              />
            </div>
          </form>
        </div>

        <div className="relative ml-auto">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex cursor-pointer items-center gap-3 rounded-xl bg-white/80 px-3 py-2 transition-all duration-300 hover:border-stone-300 group"
          >
            {/* Profile Image */}
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full transition-transform duration-300 hover:scale-105">
              {session?.user.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-stone-200">
                  <span className="text-sm font-semibold text-stone-700">
                    {session?.user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="block text-left max-[400px]:hidden">
              <p
                className="text-sm font-medium text-stone-900"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {session?.user.name}
              </p>
              <p
                className="text-xs text-stone-500"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {session?.user.email}
              </p>
            </div>

            {/* Dropdown Arrow */}
            <ChevronDown
              className={`h-5 w-5 group-hover:text-stone-700 text-stone-400 transition-transform duration-300 ${isMenuOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-10 h-screen"
                onClick={() => setIsMenuOpen(false)}
              />

              {/* Dropdown Menu */}
              <div className="header-dropdown absolute right-0 z-20 mt-2 w-56 overflow-hidden rounded-xl border border-stone-200 bg-white shadow-2xl">
                <div className="border-b border-stone-200/60 p-4">
                  <p
                    className="truncate text-sm font-medium text-stone-900"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {session?.user.name}
                  </p>
                  <p
                    className="truncate text-xs text-stone-500 pb-1"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    @{session?.user.username}
                  </p>
                  <p
                    className="truncate text-xs text-stone-500"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {session?.user.email}
                  </p>
                </div>

                <div className="p-2">
                  <button
                    onClick={handleLogout}
                    className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-left transition-all duration-300 hover:bg-red-50 hover:text-red-600"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span
                      className="text-sm font-medium"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Logout
                    </span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
};
