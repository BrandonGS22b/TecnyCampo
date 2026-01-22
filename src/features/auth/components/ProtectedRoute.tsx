import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth.context';

interface ProtectedRouteProps {
    children: React.ReactElement;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Cargando...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

