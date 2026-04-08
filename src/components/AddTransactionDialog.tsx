import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTransactions } from "@/contexts/TransactionContext";
import { toast } from "sonner";
import { Plus } from "lucide-react";

const AddTransactionDialog = () => {
  const { addTransaction } = useTransactions();
  const [open, setOpen] = useState(false);
  const [memberName, setMemberName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [type, setType] = useState<"savings" | "investment">("savings");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"Pending" | "Completed">("Completed");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberName || !memberEmail || !amount || !description) {
      toast.error("Please fill in all fields");
      return;
    }
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    addTransaction({ memberName, memberEmail, type, amount: numAmount, description, status });
    toast.success(`${type === "savings" ? "Savings" : "Investment"} of UGX ${numAmount.toLocaleString()} recorded for ${memberName}`);
    
    setMemberName("");
    setMemberEmail("");
    setAmount("");
    setDescription("");
    setType("savings");
    setStatus("Completed");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-xl gap-2">
          <Plus className="w-4 h-4" />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">New Transaction</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Member Name</Label>
            <Input value={memberName} onChange={e => setMemberName(e.target.value)} placeholder="Full name" />
          </div>
          <div className="space-y-2">
            <Label>Member Email</Label>
            <Input type="email" value={memberEmail} onChange={e => setMemberEmail(e.target.value)} placeholder="email@example.com" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={type} onValueChange={(v: "savings" | "investment") => setType(v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="savings">Savings</SelectItem>
                  <SelectItem value="investment">Investment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={(v: "Pending" | "Completed") => setStatus(v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Amount (UGX)</Label>
            <Input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0" min="0" />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Input value={description} onChange={e => setDescription(e.target.value)} placeholder="e.g. Monthly contribution" />
          </div>
          <Button type="submit" className="w-full rounded-xl">Record Transaction</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionDialog;
