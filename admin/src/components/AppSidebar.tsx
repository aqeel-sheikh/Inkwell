import { Home, LibraryBig, Settings, BookOpen } from "lucide-react";
import { Link, useLocation } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
    icon: LibraryBig,
  },
  {
    name: "Settings",
    path: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="gap-1 mb-2 p-1">
            <a href="/dashboard" className="flex gap-2 text-xl items-center">
              <BookOpen
                className="bg-accent-coral rounded-sm p-1 text-primary-50"
                size={30}
              />{" "}
              <span className="font-display text-s2xl font-bold text-primary-900">
                Inkwell
              </span>
            </a>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      asChild
                      className={`${isActive ? "hover:bg-accent-coral hover:text-white active:bg-accent-coral active:text-white" : "hover:text-accent-coral active:text-accent-coral"}`}
                    >
                      <Link
                        to={item.path}
                        className={`${
                          isActive ? "bg-accent-coral text-white" : ""
                        }`}
                      >
                        <item.icon />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
