import { useTransactions } from "@/contexts/TransactionContext";

const RecentSales = () => {
  const { transactions } = useTransactions();

  return (
    <div className="bg-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-display font-bold text-foreground">Recent Contributions</h3>
        <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">See All</button>
      </div>

      <div className="space-y-4">
        {transactions.slice(0, 6).map((tx) => (
          <div key={tx.id} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-sm font-bold text-foreground">
              {tx.memberName.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{tx.memberName}</p>
              <p className="text-xs text-muted-foreground">{tx.date}</p>
            </div>
            <span className="text-sm font-semibold text-primary">+UGX {tx.amount.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSales;
