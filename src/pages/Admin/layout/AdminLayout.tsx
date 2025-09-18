import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminTopbar from "../components/AdminTopBar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="min-h-dvh bg-neutral/30 flex">
      {/* Sidebar */}
      <AdminSidebar collapsed={collapsed} />
      {/* Área principal */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopbar
          collapsed={collapsed}
          onToggle={() => setCollapsed((v) => !v)}
        />
        <main className="p-4 md:p-6 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
