import { Outlet } from "react-router";
import { Header, AppSidebar } from "@/components";
import { SidebarProvider } from "@/components/ui/sidebar";

export function DashboardLayout() {
  return (
    <div className="py-2 pr-2 min-h-screen bg-[#f5f5f5] dark:bg-[#18181b]">
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 bg-white dark:bg-[#09090b] rounded-2xl w-full">
          <Header />
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
}
