import { createContext, useContext, useState, ReactNode } from "react";

export interface Transaction {
  id: string;
  memberName: string;
  memberEmail: string;
  type: "savings" | "investment";
  amount: number;
  description: string;
  status: "Pending" | "Completed";
  date: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (t: Omit<Transaction, "id" | "date">) => void;
  totalSavings: number;
  totalInvestments: number;
  totalBalance: number;
}

const TransactionContext = createContext<TransactionContextType | null>(null);

const defaultTransactions: Transaction[] = [
  { id: "1", memberName: "David Astee", memberEmail: "david@jebbidox.com", type: "savings", amount: 1456, description: "Monthly savings", status: "Pending", date: "11 Sep 2024" },
  { id: "2", memberName: "Maria Hulama", memberEmail: "maria@jebbidox.com", type: "investment", amount: 42437, description: "Stock investment", status: "Completed", date: "11 Sep 2024" },
  { id: "3", memberName: "Arnold Swarz", memberEmail: "arnold@jebbidox.com", type: "savings", amount: 3412, description: "Weekly savings", status: "Completed", date: "11 Sep 2024" },
];

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const stored = localStorage.getItem("jebbidox_transactions");
    return stored ? JSON.parse(stored) : defaultTransactions;
  });

  const addTransaction = (t: Omit<Transaction, "id" | "date">) => {
    const newTx: Transaction = {
      ...t,
      id: crypto.randomUUID(),
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    };
    const updated = [newTx, ...transactions];
    setTransactions(updated);
    localStorage.setItem("jebbidox_transactions", JSON.stringify(updated));
  };

  const totalSavings = transactions.filter(t => t.type === "savings").reduce((s, t) => s + t.amount, 0);
  const totalInvestments = transactions.filter(t => t.type === "investment").reduce((s, t) => s + t.amount, 0);
  const totalBalance = totalSavings + totalInvestments;

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, totalSavings, totalInvestments, totalBalance }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const ctx = useContext(TransactionContext);
  if (!ctx) throw new Error("useTransactions must be used within TransactionProvider");
  return ctx;
};
