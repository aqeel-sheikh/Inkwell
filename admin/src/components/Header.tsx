import { useState } from "react";
import { useSession, signOut } from "@/auth/authClient";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const Header = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <nav className="flex flex-wrap items-center pt-2 px-4 pb-2 justify-between sticky top-0 z-50 backdrop-blur-md border-b md:rounded-t-xl">
      <div className="flex items-center gap-5">
        <SidebarTrigger />
        <form className="flex items-center gap-2">
          <Input
            type="search"
            name="searchGlobal"
            id="searchGlobal"
            placeholder="Search your posts"
            className="min-w-0"
          />
        </form>
      </div>

      <div className="relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex cursor-pointer items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          {session?.user.image ? (
            <img
              src={session.user.image}
              alt={session.user.name}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="text-primary-700 font-semibold text-sm">
                {session?.user.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div className="text-left hidden sm:block">
            <p className="text-sm font-medium text-gray-900">
              {session?.user.name}
            </p>
            <p className="text-xs text-gray-500">{session?.user.email}</p>
          </div>
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isMenuOpen && (
          <>
            <div
              className="fixed min-h-screen inset-0 z-10"
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
              <button
                onClick={handleLogout}
                className="w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};
