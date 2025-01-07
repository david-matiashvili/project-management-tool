import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { createContext, useContext } from 'react';
// Create the context
const RoleContext = createContext(undefined);
// Create the provider component
export const RoleProvider = ({ currentRole, children }) => {
    return _jsx(RoleContext.Provider, { value: currentRole, children: children });
};
// Custom hook to use the RoleContext
export const useRole = () => {
    const context = useContext(RoleContext);
    if (context === undefined) {
        throw new Error('useRole must be used within a RoleProvider');
    }
    return context;
};
export const isRoleAccepted = (requiredRole) => {
    const currentRole = useRole();
    return currentRole <= requiredRole;
};
export const ProtectedComponent = ({ requiredRole, children }) => {
    const currentRole = useRole();
    // Check if the current role meets the required role
    if (currentRole > requiredRole) {
        return null;
    }
    return _jsx(_Fragment, { children: children });
};
