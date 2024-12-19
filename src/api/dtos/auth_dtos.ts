
/**
 * AuthState represents the shape of the authentication state.
 * 
 * This interface is used to define the shape of the authentication state.
 */
export interface AuthState {
    isAuthenticated: boolean;
    id: number | null;
    name: string | null;
    email: string | null;
    tier: number | null;
    organization: string | null;
    isAdmin: boolean | null;
}

/**
 * AuthContextType represents the shape of the AuthContext.
 * 
 * The AuthContext is used to provide authentication state to its children.
 */
export interface AuthContextType extends AuthState {
    isLoading: boolean;
    login: (
        email: string,
        id: string,
        name: string,
        tier: string,
        organization: string,
        isAdmin: boolean,
    ) => void;
    logout: () => void;
}