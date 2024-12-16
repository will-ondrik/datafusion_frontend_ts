import  { createContext, useContext, useEffect, useState, ReactNode } from "react";
//import ApiService from '../api/ApiService'; // Remove .js if TypeScript is set up
import Spinner from "../components/animations/spinner/spinner"; // Remove .jsx if TypeScript is set up

// Define the shape of the auth state
interface AuthState {
    isAuthenticated: boolean;
    id: string | null;
    name: string | null;
    email: string | null;
    tier: string | null;
    organization: string | null;
    isAdmin: boolean | null;
}

// Define the context's value shape
interface AuthContextType extends AuthState {
    isLoading: boolean;
    login: (email: string, id: string, name: string, tier: string, organization: string, isAdmin: boolean) => void;
    logout: () => void;
}

// Create the AuthContext with an initial value of `null`
const AuthContext = createContext<AuthContextType | null>(null);

// Define props for AuthProvider
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthState>({
        isAuthenticated: false,
        id: null,
        name: null,
        email: null,
        tier: null,
        organization: null,
        isAdmin: null,
    });

    const [isLoading, setIsLoading] = useState(true);
    const apiService = new ApiService();

    const validateUser = async () => {
        console.log('validating');
        try {
            console.log('validating try catch');
            const sessionData = await apiService.validateSession();
            console.log('Session data', sessionData);
            setAuthState({
                isAuthenticated: sessionData.isAuthenticated,
                id: sessionData.id,
                name: sessionData.name,
                email: sessionData.email,
                tier: sessionData.tier,
                organization: sessionData.organization,
                isAdmin: sessionData.isAdmin,
            });
        } catch (err) {
            console.error('Invalid credentials', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        validateUser();
    }, []);

    if (isLoading) {
        return (
            <div>
                <Spinner />
            </div>
        );
    }

    const login = (
        email: string,
        id: string,
        name: string,
        tier: string,
        organization: string,
        isAdmin: boolean
    ) => {
        console.log(email, name, tier, organization, isAdmin);
        console.log(`User:  ${name} successfully logged in.`);
        setAuthState({
            isAuthenticated: true,
            id,
            name,
            email,
            tier,
            organization,
            isAdmin,
        });
    };

    const logout = () => {
        setAuthState({
            isAuthenticated: false,
            id: null,
            name: null,
            email: null,
            tier: null,
            organization: null,
            isAdmin: null,
        });
        apiService.endSession();
    };

    return (
        <AuthContext.Provider value={{ ...authState, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
