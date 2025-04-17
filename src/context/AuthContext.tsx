
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, getUserByEmail, authenticateUser, createUser, createOrGetGoogleUser } from "@/data/users";
import { GoogleOAuthProvider } from "@react-oauth/google";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  googleLogin: (credentialResponse: any) => Promise<boolean>;
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

// This would be your actual Google client ID from the Google Cloud Console
// In production, you should use an environment variable
const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID_HERE";

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

  const googleLogin = async (credentialResponse: any): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          // Decode the JWT token to get user info
          // In a real application, you should verify this token with Google's servers
          const token = credentialResponse.credential;
          const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;
          
          if (!decodedToken || !decodedToken.email) {
            console.error("Invalid Google token");
            resolve(false);
            return;
          }
          
          // Extract user information from the token
          const { email, name, picture, sub: googleId } = decodedToken;
          
          // Create or get a user from our system
          const googleUser = createOrGetGoogleUser({
            email,
            name,
            googleId,
            picture
          });
          
          if (googleUser) {
            setUser(googleUser);
            setIsAuthenticated(true);
            localStorage.setItem("currentUser", JSON.stringify(googleUser));
            resolve(true);
          } else {
            resolve(false);
          }
        } catch (error) {
          console.error("Google login error:", error);
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
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthContext.Provider value={{ user, login, register, googleLogin, logout, isAuthenticated }}>
        {children}
      </AuthContext.Provider>
    </GoogleOAuthProvider>
  );
};
