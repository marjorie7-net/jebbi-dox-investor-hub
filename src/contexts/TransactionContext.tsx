import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";

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
  addTransaction: (t: Omit<Transaction, "id" | "date">) => Promise<void>;
  totalSavings: number;
  totalInvestments: number;
  totalBalance: number;
  loading: boolean;
}

const TransactionContext = createContext<TransactionContextType | null>(null);

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = useCallback(async () => {
    if (!user) {
      setTransactions([]);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) {
      setTransactions(
        data.map((r: any) => ({
          id: r.id,
          memberName: r.member_name,
          memberEmail: r.member_email,
          type: r.type,
          amount: Number(r.amount),
          description: r.description,
          status: r.status,
          date: formatDate(r.created_at),
        }))
      );
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const addTransaction = async (t: Omit<Transaction, "id" | "date">) => {
    if (!user) return;
    const { error } = await supabase.from("transactions").insert({
      user_id: user.id,
      member_name: t.memberName,
      member_email: t.memberEmail,
      type: t.type,
      amount: t.amount,
      description: t.description,
      status: t.status,
    });
    if (!error) await fetchTransactions();
  };

  const totalSavings = transactions.filter(t => t.type === "savings").reduce((s, t) => s + t.amount, 0);
  const totalInvestments = transactions.filter(t => t.type === "investment").reduce((s, t) => s + t.amount, 0);
  const totalBalance = totalSavings + totalInvestments;

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, totalSavings, totalInvestments, totalBalance, loading }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const ctx = useContext(TransactionContext);
  if (!ctx) throw new Error("useTransactions must be used within TransactionProvider");
  return ctx;
};
