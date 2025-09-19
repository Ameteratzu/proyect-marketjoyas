import { Outlet } from "react-router-dom";
import Container from "../../components/Container";
import AccountSidebar from "./components/AccountSidebar";

export default function AccountLayout() {
  return (
    <div className="bg-neutral-50">
      <Container>
        <div className="py-8 md:py-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Sidebar */}
            <aside className="md:col-span-4 lg:col-span-3">
              <AccountSidebar />
            </aside>
            {/* Content */}
            <main className="md:col-span-8 lg:col-span-9">
              <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </Container>
    </div>
  );
}
