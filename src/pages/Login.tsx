import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Eye, EyeOff, TrendingUp, Mail } from "lucide-react";

type Mode = "login" | "signup" | "forgot" | "otp";

const Login = () => {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const { user, signIn, signUp, verifyOtp, resendOtp, resetPassword } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: "Login Invalid", description: "Please fill in all fields.", variant: "destructive" });
      return;
    }
    setBusy(true);
    const { error } = await signIn(email, password);
    setBusy(false);
    if (error) {
      toast({ title: "Login Invalid", description: error, variant: "destructive" });
    } else {
      toast({ title: "Verification Code Sent", description: `Check ${email} for your one-time passcode.` });
      setMode("otp");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast({ title: "Sign Up Failed", description: "Please fill in all fields.", variant: "destructive" });
      return;
    }
    setBusy(true);
    const { error } = await signUp(name, email, password);
    setBusy(false);
    if (error) {
      toast({ title: "Sign Up Failed", description: error, variant: "destructive" });
    } else {
      toast({ title: "Verify Your Email", description: `We sent a code to ${email}.` });
      setMode("otp");
    }
  };

  const handleOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      toast({ title: "Code Required", description: "Enter the code from your email.", variant: "destructive" });
      return;
    }
    setBusy(true);
    const { error } = await verifyOtp(email, otp);
    setBusy(false);
    if (error) {
      toast({ title: "Invalid Code", description: error, variant: "destructive" });
    } else {
      toast({ title: "Login Success", description: "Welcome to Jebbi Dox!" });
      navigate("/dashboard");
    }
  };

  const handleResend = async () => {
    setBusy(true);
    const { error } = await resendOtp(email);
    setBusy(false);
    toast({
      title: error ? "Error" : "Code Resent",
      description: error || `A new code was sent to ${email}.`,
      variant: error ? "destructive" : "default",
    });
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({ title: "Error", description: "Please enter your email.", variant: "destructive" });
      return;
    }
    setBusy(true);
    const { error } = await resetPassword(email);
    setBusy(false);
    toast({
      title: error ? "Error" : "Reset Link Sent",
      description: error || "Check your email for password reset instructions.",
      variant: error ? "destructive" : "default",
    });
    if (!error) setMode("login");
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute rounded-full border border-primary-foreground/20"
              style={{ width: `${200 + i * 150}px`, height: `${200 + i * 150}px`, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary-foreground/20 flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-display font-bold text-primary-foreground mb-4">Jebbi Dox</h1>
          <p className="text-xl text-primary-foreground/80 font-display">Youth Investment Club</p>
          <p className="mt-6 text-primary-foreground/60 max-w-sm mx-auto leading-relaxed">
            Track your savings, grow your investments, and build your financial future — together.
          </p>
        </motion.div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-card">
        <motion.div key={mode} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-display font-bold text-foreground">Jebbi Dox</span>
          </div>

          <h2 className="text-3xl font-display font-bold text-foreground mb-2">
            {mode === "login" && "Welcome Back"}
            {mode === "signup" && "Create Account"}
            {mode === "forgot" && "Reset Password"}
            {mode === "otp" && "Verify Your Email"}
          </h2>
          <p className="text-muted-foreground mb-8">
            {mode === "login" && "Sign in to your investment dashboard"}
            {mode === "signup" && "Join the youth investment club"}
            {mode === "forgot" && "Enter your email to receive a reset link"}
            {mode === "otp" && `Enter the 6-digit code sent to ${email}`}
          </p>

          {mode === "otp" ? (
            <form onSubmit={handleOtp} className="space-y-5">
              <div className="space-y-2">
                <Label className="text-foreground">One-Time Passcode</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input value={otp} onChange={e => setOtp(e.target.value)} placeholder="123456" maxLength={6}
                    className="h-12 pl-11 bg-background border-border tracking-widest text-center text-lg" />
                </div>
              </div>
              <Button type="submit" disabled={busy} className="w-full h-12 text-base font-semibold rounded-xl">
                {busy ? "Verifying..." : "Verify & Sign In"}
              </Button>
              <div className="flex items-center justify-between text-sm">
                <button type="button" onClick={() => setMode("login")} className="text-muted-foreground hover:text-foreground">
                  ← Back to login
                </button>
                <button type="button" onClick={handleResend} disabled={busy} className="text-primary font-semibold hover:underline">
                  Resend code
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={mode === "login" ? handleLogin : mode === "signup" ? handleSignup : handleForgot} className="space-y-5">
              {mode === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">Full Name</Label>
                  <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your full name" className="h-12 bg-background border-border" />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@jebbidox.com" className="h-12 bg-background border-border" />
              </div>
              {mode !== "forgot" && (
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">Password</Label>
                  <div className="relative">
                    <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="h-12 bg-background border-border pr-12" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              )}

              {mode === "login" && (
                <div className="flex justify-end">
                  <button type="button" onClick={() => setMode("forgot")} className="text-sm text-primary hover:underline">
                    Forgot Password?
                  </button>
                </div>
              )}

              <Button type="submit" disabled={busy} className="w-full h-12 text-base font-semibold rounded-xl">
                {busy ? "Please wait..." : mode === "login" ? "Sign In" : mode === "signup" ? "Create Account" : "Send Reset Link"}
              </Button>
            </form>
          )}

          {mode !== "otp" && (
            <div className="mt-6 text-center text-sm text-muted-foreground">
              {mode === "login" && (
                <>Don't have an account?{" "}
                  <button onClick={() => setMode("signup")} className="text-primary font-semibold hover:underline">Sign Up</button>
                </>
              )}
              {(mode === "signup" || mode === "forgot") && (
                <>Already have an account?{" "}
                  <button onClick={() => setMode("login")} className="text-primary font-semibold hover:underline">Sign In</button>
                </>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
