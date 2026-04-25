import { createContext, useContext, useState } from "react";
import { useEffect } from "react";


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null); // "admin" | "customer" | "provider"

  
useEffect(() => {
  const savedUser = localStorage.getItem("user");
  const savedRole = localStorage.getItem("role");

  if (savedUser && savedRole) {
    setCurrentUser(JSON.parse(savedUser));
    setRole(savedRole);
  }
}, []);

  const login = (userData, userRole) => {
    setCurrentUser(userData);
    setRole(userRole);

    // optional persistence
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("role", userRole);
  };

  const logout = () => {
    setCurrentUser(null);
    setRole(null);

    localStorage.removeItem("user");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// custom hook
export const useAuth = () => useContext(AuthContext);