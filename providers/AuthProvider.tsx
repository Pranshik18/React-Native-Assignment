import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
    token: string | null;
    setToken: (token: string | null) => void;
    loading: boolean;
    rewardCoins: number;
    setReward: (rewardCoins: number) => void;
    completedExercises: Record<number, boolean>;
    completeExercise: (id: number) => void; // Updated to use 'id'
    streakDays: number;
    updateStreak: (newStreak: number) => void;
    completedDays: string[];
    setCompletedDays: (days: string[]) => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setTokenState] = useState<string | null>(null);
    const [rewardCoins, setRewardCoins] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [completedExercises, setCompletedExercises] = useState<Record<number, boolean>>({});
    const [streakDays, setStreakDays] = useState<number>(0);
    const [completedDays, setCompletedDays] = useState<string[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('authToken');
                if (storedToken) {
                    setTokenState(storedToken);
                }

                const rewards = await AsyncStorage.getItem('rewardCoins');
                if (rewards) {
                    setRewardCoins(Number(rewards));
                }

                const completed = await AsyncStorage.getItem('completedExercises');
                if (completed) {
                    setCompletedExercises(JSON.parse(completed));
                }

                const savedStreak = await AsyncStorage.getItem('streakDays');
                if (savedStreak !== null) {
                    setStreakDays(Number(savedStreak));
                }

                const savedCompletedDays = await AsyncStorage.getItem('completedDays');
                if (savedCompletedDays) {
                    setCompletedDays(JSON.parse(savedCompletedDays));
                }
            } catch (error) {
                console.error('Failed to load data', error);
            } finally {
                setLoading(false); // Set loading to false after all async operations
            }
        };

        loadData();
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

    const setReward = async (reward: number) => {
        try {
            if (reward) {
                await AsyncStorage.setItem('rewardCoins', reward.toString());
            } else {
                await AsyncStorage.removeItem('rewardCoins');
            }
            setRewardCoins(reward);
        } catch (error) {
            console.error('Failed to save reward', error);
        }
    };

    const completeExercise = async (id: number) => {
        try {
            setCompletedExercises((prev) => {
                const updated = { ...prev, [id]: true };
                AsyncStorage.setItem('completedExercises', JSON.stringify(updated));
                return updated;
            });
        } catch (error) {
            console.error('Failed to save completed exercises', error);
        }
    };

    const updateStreak = async (newStreak: number) => {
        try {
            setStreakDays(newStreak);
            await AsyncStorage.setItem('streakDays', newStreak.toString());
        } catch (error) {
            console.error('Failed to save streakDays', error);
        }
    };

    const updateCompletedDays = async (days: string[]) => {
        try {
            setCompletedDays(days);
            await AsyncStorage.setItem('completedDays', JSON.stringify(days));
        } catch (error) {
            console.error('Failed to save completedDays', error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                setToken,
                loading,
                rewardCoins,
                setReward,
                completedExercises,
                completeExercise,
                streakDays,
                updateStreak,
                completedDays,
                setCompletedDays: updateCompletedDays, // Provide the function with a new name
            }}
        >
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
