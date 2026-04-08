import { TrendingUp, DollarSign, PiggyBank } from "lucide-react";
import { motion } from "framer-motion";
import { useTransactions } from "@/contexts/TransactionContext";

const StatsCards = () => {
  const { totalBalance, totalInvestments, totalSavings } = useTransactions();

  const stats = [
    { label: "Balance", value: `UGX ${totalBalance.toLocaleString()}`, change: "+17%", icon: DollarSign, color: "bg-accent" },
    { label: "Investments", value: `UGX ${totalInvestments.toLocaleString()}`, change: "+23%", icon: TrendingUp, color: "bg-secondary" },
    { label: "Savings", value: `UGX ${totalSavings.toLocaleString()}`, change: "+12%", icon: PiggyBank, color: "bg-muted" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`${stat.color} rounded-2xl p-5 relative overflow-hidden`}
        >
          <div className="flex items-center gap-2 mb-3">
            <stat.icon className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground font-medium">{stat.label}</span>
            <span className="ml-auto text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              {stat.change}
            </span>
          </div>
          <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;
