import  { createContext, useContext, useEffect, useState } from "react";
import Spinner from "../components/animations/spinner/spinner"; // Remove .jsx if TypeScript is set up
import AuthService from "../api/services/auth/AuthService";
import { AuthContextType, AuthState } from "../api/services/auth/AuthDtos";
import { ProviderProps } from "../types/props/ProviderProp";


// Create the AuthContext with an initial value of null
const AuthContext = createContext<AuthContextType | null>(null);

// AuthProvider component
export const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const authService = new AuthService();
    const [authState, setAuthState] = useState<AuthState>({
        isAuthenticated: false,
        id: null,
        name: null,
        email: null,
        tier: null,
        organization: null,
        isAdmin: null,
    });

    /**
     * Validates the user session with the server.
     * 
     * Calls the AuthService - validateSession function.
     * 
     * This function is available to other components via the AuthContext.
     */
    const validateUserSession = async() => {
        setIsLoading(true);
        try {
            const result = await authService.validateSession();
            setAuthState(result);
        } catch (err) {
            console.error("Unexpected error during session validation:", err);
            SetNullAuthState();
        } finally {
            setIsLoading(false); 
        }
    };
    
    // Call validateUserSession on component mount
    useEffect(() => {
        validateUserSession();
    }, []);

    // Show spinner while loading
    if (isLoading) {
        return (
            <div>
                <Spinner />
            </div>
        );
    }

    /**
     * Logs the user in.
     * 
     * Calls the AuthService - handleGoogleLogin function.
     * 
     * This function is available to other components via the AuthContext.
     */
    const login = async() => {
        setIsLoading(true);
        try {
            const response = await authService.handleGoogleLogin();
            console.log(response);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    /**
     * Logs the user out.
     * 
     * Calls the AuthService - logout function.
     * 
     * This function is available to other components via the AuthContext.
     */
    const logout = async() => {
        setIsLoading(true)
        try {
            const result = authService.logout();
            SetNullAuthState();
            console.log(result);
        } catch(err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    /**
     * Sets the AuthState to null.
     */    
    const SetNullAuthState = () => {
        setAuthState({
            isAuthenticated: false,
            id: null,
            name: null,
            email: null,
            tier: null,
            organization: null,
            isAdmin: null,
        });
    }

    /**
     * Returns the AuthContext.Provider with the AuthContext value.
     * 
     * The AuthContext value is an object with the following properties:
     * - authState: The current authentication state of the user.
     * - isLoading: A boolean indicating if the app is loading.
     * - login: A function to log the user in.
     * - logout: A function to log the user out.
     */
    return (
        <AuthContext.Provider value={{ ...authState, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use AuthContext
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
