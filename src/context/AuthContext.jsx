// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Restore session from localStorage on initial load
    const savedUser = localStorage.getItem("techcart_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email) => {
    const userData = { email, token: "mock-jwt-token-xyz-123" };
    setUser(userData);
    localStorage.setItem("techcart_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("techcart_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
