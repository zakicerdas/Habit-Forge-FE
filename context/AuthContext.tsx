import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";

type User = {
    id: string;
    email: string;
    username: string;
};

type AuthContextType = {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    register: (email: string, username: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    /**
     * =========================
     * LOAD DATA SAAT APP DIBUKA
     * =========================
     * Ambil token & user dari AsyncStorage
     * Supaya login TIDAK hilang saat app restart
     */
    useEffect(() => {
        const loadStorage = async () => {
            try {
                const storedToken = await AsyncStorage.getItem("token");
                const storedUser = await AsyncStorage.getItem("user");

                if (storedToken && storedUser) {
                    setToken(storedToken);
                    setUser(JSON.parse(storedUser));
                }
            } catch (err) {
                console.log("Gagal load auth storage", err);
            } finally {
                setIsLoading(false);
            }
        };

        loadStorage();
    }, []);

    /**
     * =========================
     * REGISTER
     * =========================
     * Hanya kirim data → backend
     * TIDAK menyimpan token
     */
    const register = async (
        email: string,
        username: string,
        password: string
    ) => {
        await api.post("/auth/register", {
            email,
            username,
            password,
        });
    };

    /**
     * =========================
     * LOGIN (FETCHING TERJADI DI SINI)
     * =========================
     * Backend response:
     * res.data.data.user
     * res.data.data.token
     */
    const login = async (email: string, password: string) => {
        const res = await api.post("/auth/login", {
            email,
            password,
        });

       const {
    user: loggedInUser,
    token: accessToken, 
  } = res.data.data;


        await AsyncStorage.setItem("token", accessToken);
        await AsyncStorage.setItem("user", JSON.stringify(loggedInUser));

        setToken(accessToken);
        setUser(loggedInUser);
    };

    /**
     * =========================
     * LOGOUT
     * =========================
     * Bersihkan storage & state
     */
    const logout = async () => {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("user");

        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, token, isLoading, register, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};
