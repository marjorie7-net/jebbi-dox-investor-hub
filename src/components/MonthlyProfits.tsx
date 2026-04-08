import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useTransactions } from "@/contexts/TransactionContext";

const MonthlyProfits = () => {
  const { totalSavings, totalInvestments, totalBalance } = useTransactions();

  const returns = Math.round(totalBalance * 0.16);
  const total = totalBalance + returns;

  const data = [
    { name: "Savings", value: totalSavings || 60, color: "hsl(0, 45%, 35%)" },
    { name: "Investments", value: totalInvestments || 24, color: "hsl(45, 15%, 75%)" },
    { name: "Returns", value: returns || 16, color: "hsl(36, 25%, 88%)" },
  ];

  return (
    <div className="bg-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-display font-bold text-foreground">Monthly Profits</h3>
          <p className="text-sm text-muted-foreground">Total Profit Growth of 26%</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative w-36 h-36">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" strokeWidth={0}>
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs text-muted-foreground">Total</span>
            <span className="text-sm font-bold text-foreground">UGX {total.toLocaleString()}</span>
          </div>
        </div>

        <div className="space-y-3">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <div>
                <p className="text-sm font-medium text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground">{Math.round(item.value / (total || 1) * 100)}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonthlyProfits;
