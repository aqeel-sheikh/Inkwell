import { Home, FileText, Settings, BookOpen, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router";
import { signOut } from "@/auth/authClient";
import { useNavigate } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: Home,
  },
  {
    name: "Blog Posts",
    path: "/dashboard/blogs",
    icon: FileText,
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <>
      <style>{`
        /* Logo hover animation */
        .logo-link:hover .logo-icon {
          transform: scale(1.1) rotate(3deg);
        }
        
        /* Menu item icon hover */
        .menu-item:hover .menu-icon {
          transform: scale(1.1);
        }
        /* Logout button */
        .logout:hover .logout-icon{
          transform: scale(1.1);
        }
      `}</style>

      <Sidebar
        collapsible="icon"
        className="border-r border-stone-200/60 bg-white/95 backdrop-blur-xl"
      >
        <SidebarContent>
          <SidebarGroup>
            {/* Logo */}
            <SidebarGroupLabel className="mb-6 p-4">
              <a
                href="/dashboard"
                className="logo-link flex items-center gap-3"
              >
                <div className="logo-icon flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-amber-500 to-rose-500 shadow-lg transition-all duration-300">
                  <BookOpen className="h-6 w-6 text-white" strokeWidth={2} />
                </div>
                <span
                  className="text-2xl font-light tracking-tight text-stone-900"
                  style={{ fontFamily: "'Crimson Pro', serif" }}
                >
                  Inkwell
                </span>
              </a>
            </SidebarGroupLabel>

            {/* Navigation */}
            <SidebarGroupContent className="px-3 -mx-3">
              <SidebarMenu className="space-y-1">
                {items.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton
                        tooltip={item.name}
                        asChild
                        className={`
                          menu-item relative overflow-hidden rounded-xl px-4 py-3 
                          ${
                            isActive
                              ? "bg-linear-to-br from-stone-900 to-stone-800 hover:text-white text-white shadow-lg hover:shadow-xl"
                              : "text-stone-700 hover:bg-stone-100 hover:text-stone-900"
                          }
                        `}
                      >
                        <Link
                          to={item.path}
                          className="flex items-center gap-3"
                        >
                          {/* Icon */}
                          <item.icon
                            className={`menu-icon h-5 w-5 transition-transform duration-300 will-change-transform ${isActive ? "scale-110" : ""}`}
                            strokeWidth={2}
                          />

                          {/* Label */}
                          <span
                            className="text-sm font-medium"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                          >
                            {item.name}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="pb-5 px-3 -mx-1">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleLogout}
                tooltip={"Logout"}
                className="logout flex font-medium px-4 rounded-xl text-stone-600 transition-all duration-300 hover:text-stone-900 cursor-pointer"
              >
                <LogOut
                  className="logout-icon h-4 w-4 transition-all duration-300 will-change-transform"
                  strokeWidth={2}
                />
                <span className="">Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
