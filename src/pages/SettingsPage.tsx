import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Settings, User, Bell, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const SettingsPage = () => {
  const { user } = useAuth();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Settings className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-display font-bold text-foreground">Settings</h2>
      </div>

      <div className="bg-card rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <User className="w-5 h-5 text-muted-foreground" />
          <h3 className="text-lg font-display font-semibold text-foreground">Profile</h3>
        </div>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input defaultValue={user?.name} className="bg-background" />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input defaultValue={user?.email} className="bg-background" disabled />
          </div>
        </div>
        <Button className="rounded-xl" onClick={() => toast.success("Profile updated!")}>Save Changes</Button>
      </div>

      <div className="bg-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <h3 className="text-lg font-display font-semibold text-foreground">Notifications</h3>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Email Notifications</p>
            <p className="text-xs text-muted-foreground">Receive email updates on savings</p>
          </div>
          <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">SMS Notifications</p>
            <p className="text-xs text-muted-foreground">Get text messages for transactions</p>
          </div>
          <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
        </div>
      </div>

      <div className="bg-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-5 h-5 text-muted-foreground" />
          <h3 className="text-lg font-display font-semibold text-foreground">Security</h3>
        </div>
        <Button variant="outline" className="rounded-xl" onClick={() => toast.info("Password reset email sent!")}>
          Change Password
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;
