import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard, BarChart3, CreditCard, ArrowLeftRight,
  Package, Users, MessageCircle, Settings, LogOut, X, TrendingUp
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: BarChart3, label: "Statistics" },
  { icon: CreditCard, label: "Investments" },
  { icon: ArrowLeftRight, label: "Transactions" },
  { icon: Package, label: "Savings" },
  { icon: Users, label: "Members" },
  { icon: MessageCircle, label: "Messages", badge: 3 },
  { icon: Settings, label: "Settings" },
];

interface Props {
  userName: string;
  activeNav: string;
  onNavChange: (nav: string) => void;
  onLogout: () => void;
  onClose: () => void;
}

const DashboardSidebar = ({ userName, activeNav, onNavChange, onLogout, onClose }: Props) => {
  return (
    <div className="h-full flex flex-col bg-sidebar text-sidebar-foreground">
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-sidebar-primary flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          <span className="text-lg font-display font-bold">Jebbi Dox</span>
        </div>
        <button onClick={onClose} className="lg:hidden text-sidebar-foreground/60 hover:text-sidebar-foreground">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* User */}
      <div className="px-6 pb-6 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-sidebar-accent flex items-center justify-center text-lg font-bold">
          {userName.charAt(0)}
        </div>
        <div>
          <p className="text-xs text-sidebar-foreground/50">Welcome Back,</p>
          <p className="font-semibold text-sm">{userName}</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map(({ icon: Icon, label, badge }) => (
          <button
            key={label}
            onClick={() => onNavChange(label)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeNav === label
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            <Icon className="w-5 h-5" />
            {label}
            {badge && (
              <span className="ml-auto w-5 h-5 rounded-full bg-sidebar-primary text-sidebar-primary-foreground text-xs flex items-center justify-center">
                {badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 pb-6">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
