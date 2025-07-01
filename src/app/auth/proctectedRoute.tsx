import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import { Navigate, useLocation } from "react-router-dom";


import type { User } from "firebase/auth";

interface AuthContextType {
    user: User | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(auth.currentUser);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
            if (firebaseUser) {
                await firebaseUser.reload();
                setUser(auth.currentUser);
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};


export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
    if (!user.emailVerified) {
        return (
            <div className="container py-5 text-center">
                <h2>Please verify your email address</h2>
                <p>Check your inbox for a verification email before accessing this page.</p>
            </div>
        );
    }
    return <>{children}</>;
};
export function useAuth(): { user: User | null; loading: boolean } {
    return useContext(AuthContext);
}