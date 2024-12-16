import { ValidateSessionResponse } from "./AuthDtos";

class AuthService {
    private API_URL: string | null = null;

    setApiUrl(url: string) {
        this.API_URL = url;
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

                // Return an appropriate error
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
     * Validates the user's session with the server.
     * 
     * @returns A Promise that resolves to one of the following:
     * - `AuthContextType` if the session is valid or invalid.
     * - An error object `{ error: string }` if there was a network or server issue.
     */
    async validateSession(): Promise< ValidateSessionResponse | Error > {
        try {
            const response = await fetch(`${this.API_URL}/auth/validate-session`, {
                method: "GET",
                credentials: "include",
            });

            if (!response.ok) {
                return { 
                    isAuthenticated: false, 
                    id: null, 
                    name: null, 
                    email: null, 
                    tier: null, 
                    organization: null, 
                    isAdmin: null, 
                }
            }

            const data = await response.json();
            return { 
                isAuthenticated: true, 
                id: data.id, 
                name: data.name, 
                email: data.email, 
                tier: data.tier, 
                organization: data.organization, 
                isAdmin: data.isAdmin 
            }
        } catch (err) {
            return new Error("Session is invald.")
        }
    
    }

}

export default AuthService;