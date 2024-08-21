import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
    token: string | null;
    setToken: (token: string | null) => void;
    loading: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setTokenState] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('authToken');
                if (storedToken) {
                    setTokenState(storedToken);
                }
            } catch (error) {
                console.error('Failed to load token', error);
            } finally {
                setLoading(false);
            }
        };
        loadToken();
    }, []);

    const setToken = async (newToken: string | null) => {
        try {
            if (newToken) {
                await AsyncStorage.setItem('authToken', newToken);
            } else {
                await AsyncStorage.removeItem('authToken');
            }
            setTokenState(newToken);
        } catch (error) {
            console.error('Failed to save token', error);
        }
    };

    return (
        <AuthContext.Provider value={{ token, setToken, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
