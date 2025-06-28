import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  Children,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const status = await AsyncStorage.getItem("isAuthenticated");
      setIsAuthenticated(status === "true");
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    if (email && password) {
      await AsyncStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true);
    }
  };

  const logout = async () => {
    await AsyncStorage.setItem("isAuthenticated", "false");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
