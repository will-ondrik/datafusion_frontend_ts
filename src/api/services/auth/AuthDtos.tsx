interface AuthContextType {
    isAuthenticated: boolean;
    id: string | null;
    name: string | null;
    email: string | null;
    tier: string | null;
    organization: string | null;
    isAdmin: boolean | null;
}

export type ValidateSessionResponse = AuthContextType | { error: string };
