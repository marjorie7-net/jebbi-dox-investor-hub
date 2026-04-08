import { useTransactions } from "@/contexts/TransactionContext";
import { Bell, CheckCircle, Clock } from "lucide-react";

const NotificationsPage = () => {
  const { transactions } = useTransactions();

  const notifications = transactions.slice(0, 10).map(tx => ({
    id: tx.id,
    title: tx.status === "Completed"
      ? `${tx.memberName}'s ${tx.type} recorded`
      : `Pending ${tx.type} from ${tx.memberName}`,
    description: `UGX ${tx.amount.toLocaleString()} - ${tx.description}`,
    date: tx.date,
    read: tx.status === "Completed",
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Bell className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-display font-bold text-foreground">Notifications</h2>
      </div>

      <div className="space-y-3">
        {notifications.map(n => (
          <div key={n.id} className={`bg-card rounded-2xl p-4 flex items-start gap-3 ${!n.read ? "border-l-4 border-primary" : ""}`}>
            {n.read ? (
              <CheckCircle className="w-5 h-5 text-success mt-0.5 shrink-0" />
            ) : (
              <Clock className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            )}
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{n.title}</p>
              <p className="text-xs text-muted-foreground">{n.description}</p>
            </div>
            <span className="text-xs text-muted-foreground shrink-0">{n.date}</span>
          </div>
        ))}
        {notifications.length === 0 && (
          <div className="bg-card rounded-2xl p-8 text-center text-muted-foreground">
            No notifications yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
