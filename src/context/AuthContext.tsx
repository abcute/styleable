
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, getUserByEmail, authenticateUser, createUser } from "@/data/users";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("currentUser");
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate network request
    return new Promise((resolve) => {
      setTimeout(() => {
        const authenticatedUser = authenticateUser(email, password);
        
        if (authenticatedUser) {
          setUser(authenticatedUser);
          setIsAuthenticated(true);
          // Store user in localStorage (remember me)
          localStorage.setItem("currentUser", JSON.stringify(authenticatedUser));
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500); // Simulate network delay
    });
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    // Simulate network request
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if email already exists
        const existingUser = getUserByEmail(email);
        
        if (existingUser) {
          resolve(false);
        } else {
          const newUser = createUser({ email, password, name });
          setUser(newUser);
          setIsAuthenticated(true);
          // Store user in localStorage (remember me)
          localStorage.setItem("currentUser", JSON.stringify(newUser));
          resolve(true);
        }
      }, 500); // Simulate network delay
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
