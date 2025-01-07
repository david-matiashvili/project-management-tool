import React, { ReactNode } from 'react';
type RoleContextType = number;
interface RoleProviderProps {
    currentRole: number;
    children: ReactNode;
}
interface ProtectedComponentProps {
    requiredRole: number;
    children: ReactNode;
}
export declare const RoleProvider: React.FC<RoleProviderProps>;
export declare const useRole: () => RoleContextType;
export declare const isRoleAccepted: (requiredRole: number) => boolean;
export declare const ProtectedComponent: React.FC<ProtectedComponentProps>;
export {};
