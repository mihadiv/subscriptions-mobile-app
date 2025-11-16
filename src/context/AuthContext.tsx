import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";
import API_URL from "../config/api";
import { router } from "expo-router";

type AuthContextType = {
  isAuthenticated: boolean;
  user: any;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (name: string, email: string, password: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadAuthData = async () => {
      const token = await AsyncStorage.getItem("token");
      const userData = await AsyncStorage.getItem("user");

      if (token && userData) {
        setIsAuthenticated(true);
        setUser(JSON.parse(userData));
      }
    };

    loadAuthData();
  }, []);

  const register = async (name: string, email: string, password: string) => {
    try {
      await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
      });

      Alert.alert("Registered successfully!");
    } catch (error: any) {
      Alert.alert(error.response?.data?.message || "Registration failed");
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      await AsyncStorage.setItem("token", res.data.token);
      await AsyncStorage.setItem("user", JSON.stringify(res.data.user));

      setUser(res.data.user);
      setIsAuthenticated(true);

      // Alert.alert("Login successful!");
    } catch (error: any) {
      Alert.alert(error.response?.data?.message || "Login failed");
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");

    setIsAuthenticated(false);
    setUser(null);

    router.replace("/auth/login");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, register }}
    >
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
