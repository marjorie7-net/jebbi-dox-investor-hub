import { useTransactions } from "@/contexts/TransactionContext";

const LastOrders = () => {
  const { transactions } = useTransactions();

  return (
    <div className="bg-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-display font-bold text-foreground">Last Transactions</h3>
        <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          View All Transactions
        </button>
      </div>
      <p className="text-xs text-muted-foreground mb-4">Data Updates Every 3 Hours</p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 text-muted-foreground font-medium">Member</th>
              <th className="text-left py-3 text-muted-foreground font-medium">Type</th>
              <th className="text-left py-3 text-muted-foreground font-medium">Amount</th>
              <th className="text-left py-3 text-muted-foreground font-medium">Status</th>
              <th className="text-left py-3 text-muted-foreground font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.slice(0, 5).map((tx) => (
              <tr key={tx.id} className="border-b border-border/50 last:border-0">
                <td className="py-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-xs font-bold text-foreground">
                    {tx.memberName.charAt(0)}
                  </div>
                  <span className="font-medium text-foreground">{tx.memberName}</span>
                </td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    tx.type === "savings" ? "bg-primary/10 text-primary" : "bg-accent text-foreground"
                  }`}>
                    {tx.type}
                  </span>
                </td>
                <td className="py-3 text-foreground">UGX {tx.amount.toLocaleString()}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    tx.status === "Completed"
                      ? "bg-success/10 text-success"
                      : "bg-accent text-muted-foreground"
                  }`}>
                    {tx.status}
                  </span>
                </td>
                <td className="py-3 text-muted-foreground">{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LastOrders;
