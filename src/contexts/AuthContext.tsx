import { useState, useEffect, createContext, useContext, ReactNode } from "react";

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock user database - persisted in localStorage
const getUsers = (): { email: string; password: string; name: string }[] => {
  const stored = localStorage.getItem("jebbidox_users");
  if (stored) return JSON.parse(stored);
  const defaults = [
    { email: "demo@jebbidox.com", password: "password123", name: "Mark Johnson" },
  ];
  localStorage.setItem("jebbidox_users", JSON.stringify(defaults));
  return defaults;
};

const saveUsers = (users: { email: string; password: string; name: string }[]) => {
  localStorage.setItem("jebbidox_users", JSON.stringify(users));
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("jebbidox_user");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("jebbidox_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("jebbidox_user");
    }
  }, [user]);

  const login = (email: string, password: string): boolean => {
    const users = getUsers();
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      setUser({ email: found.email, name: found.name });
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, password: string): boolean => {
    const users = getUsers();
    const exists = users.find((u) => u.email === email);
    if (exists) return false;
    users.push({ email, password, name });
    saveUsers(users);
    setUser({ email, name });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
