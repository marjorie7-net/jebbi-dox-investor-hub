import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "@/components/DashboardSidebar";
import StatsCards from "@/components/StatsCards";
import WeeklyChart from "@/components/WeeklyChart";
import MonthlyProfits from "@/components/MonthlyProfits";
import LastOrders from "@/components/LastOrders";
import RecentSales from "@/components/RecentSales";
import { Search, Bell, Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");

  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-foreground/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 transform transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <DashboardSidebar
          userName={user.name}
          activeNav={activeNav}
          onNavChange={setActiveNav}
          onLogout={() => { logout(); navigate("/"); }}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-2">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-foreground">
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground">Dashboard</h1>
              <p className="text-sm text-muted-foreground">Investment Updates</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-10 w-64 bg-card border-border h-10 rounded-xl" />
            </div>
            <button className="relative p-2 rounded-xl bg-card text-foreground hover:bg-accent transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="p-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="xl:col-span-2 space-y-6">
            <StatsCards />
            <WeeklyChart />
            <LastOrders />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <MonthlyProfits />
            <RecentSales />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
