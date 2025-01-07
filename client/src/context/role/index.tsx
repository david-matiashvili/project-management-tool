import React, {createContext, useContext, ReactNode} from 'react';

// Define the type for the context value
type RoleContextType = number;

// Create the context
const RoleContext = createContext<RoleContextType | undefined>(undefined);

// Define the props for the provider
interface RoleProviderProps {
    currentRole: number;
    children: ReactNode;
}

interface ProtectedComponentProps {
    requiredRole: number;
    children: ReactNode;
}

// Create the provider component
export const RoleProvider: React.FC<RoleProviderProps> = ({currentRole, children}) => {
    return <RoleContext.Provider value={currentRole}>{children}</RoleContext.Provider>;
};

// Custom hook to use the RoleContext
export const useRole = (): RoleContextType => {
    const context = useContext(RoleContext);
    if (context === undefined) {
        throw new Error('useRole must be used within a RoleProvider');
    }
    return context;
};

export const isRoleAccepted: (requiredRole: number) => boolean = (requiredRole) => {
    const currentRole = useRole();
    return currentRole <= requiredRole;
}

export const ProtectedComponent: React.FC<ProtectedComponentProps> = ({requiredRole, children}) => {
    const currentRole = useRole();

    // Check if the current role meets the required role
    if (currentRole > requiredRole) {
        return null;
    }

    return <>{children}</>;
};

