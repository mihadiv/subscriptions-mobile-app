import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  Children,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (name: string, email: string, password: string) => void;
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

  const register = async (name: string, email: string, password: string) => {
  const user = { name, email, password };
  await AsyncStorage.setItem("user", JSON.stringify(user));
};

const login = async (email: string, password: string) => {
  const storedUser = await AsyncStorage.getItem("user");

  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);

    if (parsedUser.email === email && parsedUser.password === password) {
      await AsyncStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true);
    } else {
      Alert.alert("Invalid credentials");
    }
  } else {
    Alert.alert("No registered user found.");
  }
};

const logout = async () => {
  await AsyncStorage.removeItem("isAuthenticated");
  setIsAuthenticated(false);
};

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, register }}>
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
