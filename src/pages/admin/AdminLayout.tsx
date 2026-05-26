import { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, MessageSquare, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import jsLogo from "@/assets/jaunt-logo.png";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate, location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Messages", href: "/admin/messages", icon: MessageSquare },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50/50 dark:bg-gray-900/50">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-center">
          <img
            className="h-12 w-auto object-contain dark:brightness-110"
            src={jsLogo}
            alt="Jaunt Solutions Logo"
          />
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname.includes(item.href);
            return (
              <Link key={item.href} to={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start gap-3 mb-2"
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <Button onClick={handleLogout} variant="ghost" className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/50">
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 flex items-center px-6">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {navItems.find((item) => location.pathname.includes(item.href))?.name || "Dashboard"}
          </h1>
        </header>
        <div className="flex-1 p-6 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
