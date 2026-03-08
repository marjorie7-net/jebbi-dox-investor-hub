import { useState, createContext, useContext, ReactNode } from "react";

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

// Mock user database
const mockUsers: { email: string; password: string; name: string }[] = [
  { email: "demo@jebbidox.com", password: "password123", name: "Mark Johnson" },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    const found = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      setUser({ email: found.email, name: found.name });
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, password: string): boolean => {
    const exists = mockUsers.find((u) => u.email === email);
    if (exists) return false;
    mockUsers.push({ email, password, name });
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
