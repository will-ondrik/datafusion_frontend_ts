
// AuthState represents the authentication state of a user.
export interface AuthState {
    isAuthenticated: boolean;
    id: string | null;
    name: string | null;
    email: string | null;
    tier: string | null;
    organization: string | null;
    isAdmin: boolean | null;
}
