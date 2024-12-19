import { AuthState } from "../dtos/auth_dtos";
import { environment } from "../../environment/environment";
import { User } from "../dtos/user_dtos";

class AuthService {
    private API_URL: string | null = null;

    setApiUrl() {
        this.API_URL = environment.API_BASE_URL;
    }

    /**
     * Logs out the user by calling the API.
     * 
     * @returns A Promise resolving to a success message or rejecting with an error.
     */
    async logout(): Promise<{ success: boolean; message: string } | Error> {
        try {
            const response = await fetch(`${this.API_URL}/auth/logout`, {
                method: 'POST',
                credentials: "include",
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                const message = errorData?.message || 'Logout failed due to server error.';
                console.error(`Logout failed: ${message}`);
                return new Error(message);
            }

            // Logout succeeded
            const data = await response.json();
            return {
                success: true,
                message: data.message || 'Logout successful.',
            };
        } catch (err) {
            return new Error('Network error occurred during logout.');
        }
    }

    /**
     * Logs in the user by way of Google OAuth2
     * 
     * User is redirected to the server url to initiate the Google login process.
     * 
     * @returns A promise resolving a success message or rejecting with an error.
     */
    async handleGoogleLogin(): Promise<{ message: string } | Error> {
        try {
            if (!this.API_URL) {
                return new Error("API URL is not set.")
            }
            // Navigate to the server url to initiate Google login
            // Can't make fetch requests to Google endpoints
            window.location.href = `${this.API_URL}/auth/oauth2/login`;
            return { message: "Redirecting to Google login..." }
        } catch (err) {
            return new Error("Failed to initiate Google login. Please try again.")
        }
    }

    /**
     * ProcessGoogleCallback handles the callback from the Google OAuth2 login flow.
     * 
     * @returns a promise resolving a User object or rejecting with an error.
     */
    async processGoogleCallback(): Promise<User | Error> {
        try {
            const response = await fetch(`${this.API_URL}/auth/oauth2/callback`, {
                method: "GET",
                credentials: "include",
            });

            if (!response.ok) {
                const errorData = await response.json();
                return new Error(errorData.message);
            }

            const data: User = await response.json();
            return data;
        } catch(err) {
            return new Error("Failed to authenticate user.");
        }
    }

    /**
     * Validates the user's session with the server.
     * 
     * @returns A Promise that resolves to one of the following:
     * - `AuthContextType` if the session is valid or invalid.
     */
    async validateSession(): Promise<AuthState> {
        try {
            const response = await fetch(`${this.API_URL}/auth/validate-session`, {
                method: "GET",
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Session is invalid or expired.");
            }

            const data = await response.json();

            // Return valid AuthState
            return {
                isAuthenticated: true,
                id: data.id,
                name: data.name,
                email: data.email,
                tier: data.tier,
                organization: data.organization,
                isAdmin: data.isAdmin,
            };
        } catch (err) {
            console.error("Validation error:", err);

            // Return null AuthState
            return {
                isAuthenticated: false,
                id: null,
                name: null,
                email: null,
                tier: null,
                organization: null,
                isAdmin: null,
            };
        }
    }

}

export default AuthService;