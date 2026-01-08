import React, {
    createContext,
    useState,
    useEffect,
    ReactNode,
} from "react";

type AuthContextType = {
    isLoading: boolean;
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
    isLoading: true,
    isLoggedIn: false,
    login: () => { },
    logout: () => { },
});

type Props = {
    children: ReactNode;
};

export function AuthProvider({ children }: Props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // 🔹 simulasi cek login saat app dibuka
    useEffect(() => {
        const init = async () => {
            // nanti cek token di sini
            setIsLoggedIn(false);
            setIsLoading(false);
        };

        init();
    }, []);

    const login = () => {
        setIsLoggedIn(true);
    };

    const logout = () => {
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isLoading,
                isLoggedIn,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
