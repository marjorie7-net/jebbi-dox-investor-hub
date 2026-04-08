import { useTransactions } from "@/contexts/TransactionContext";
import { Users } from "lucide-react";

const MembersPage = () => {
  const { transactions } = useTransactions();

  const members = Array.from(
    new Map(transactions.map(t => [t.memberEmail, { name: t.memberName, email: t.memberEmail }])).values()
  );

  const getMemberStats = (email: string) => {
    const memberTx = transactions.filter(t => t.memberEmail === email);
    const savings = memberTx.filter(t => t.type === "savings").reduce((s, t) => s + t.amount, 0);
    const investments = memberTx.filter(t => t.type === "investment").reduce((s, t) => s + t.amount, 0);
    return { savings, investments, total: savings + investments, txCount: memberTx.length };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Users className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-display font-bold text-foreground">Members</h2>
      </div>

      <div className="grid gap-4">
        {members.map(m => {
          const stats = getMemberStats(m.email);
          return (
            <div key={m.email} className="bg-card rounded-2xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-lg font-bold text-foreground">
                {m.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">{m.name}</p>
                <p className="text-sm text-muted-foreground">{m.email}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">UGX {stats.total.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{stats.txCount} transactions</p>
              </div>
            </div>
          );
        })}
        {members.length === 0 && (
          <div className="bg-card rounded-2xl p-8 text-center text-muted-foreground">
            No members yet. Add transactions to see members here.
          </div>
        )}
      </div>
    </div>
  );
};

export default MembersPage;
