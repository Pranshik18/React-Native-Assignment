import Toast from '@/components/toast/Toast';
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ToastContextProps {
    showToast: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [toastVisible, setToastVisible] = useState(false);

    const showToast = (message: string, duration = 3000) => {
        setToastMessage(message);
        setToastVisible(true);
        setTimeout(() => {
            setToastVisible(false);
        }, duration);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <Toast message={toastMessage || ''} visible={toastVisible} />
        </ToastContext.Provider>
    );
};

export const useToast = (): ToastContextProps => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
