import { createContext, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
    isAuth: boolean;
    login: (token: string) => void;
    logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [isAuth, setIsAuth] = useState<boolean>(false);


    const checkToken = () => {
        const token = Cookies.get('token');

        if (token) {
            try {
                const decoded: { exp: number } = jwtDecode(token);

                const isTokenValid: boolean = decoded.exp * 1000 > Date.now();
                console.log(decoded.exp);

                if (!isTokenValid) {
                    Cookies.remove('token');
                    logout();
                } else {
                    setIsAuth(true);
                }

            } catch (error) {
                Cookies.remove('token');
                logout();
            }
        } else {
            logout();
        }
    }

    useEffect(() => {
        checkToken();
        const interval = setInterval(checkToken, 600);
        return () => clearInterval(interval);
    }), [];

    const login = (token: string) => {
        Cookies.set('token', token, { expires: 7 });
        setIsAuth(true);
    }

    const logout = () => {
        Cookies.remove('token');
        setIsAuth(false);
    }

    return (
        <AuthContext.Provider value={{ isAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("Ошибка получения контекста");
    }

    return context;
}