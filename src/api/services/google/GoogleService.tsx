import { environment } from "../../../environment/environment";

class GoogleService {
    private API_URL: string | null = null;

    setApiUrl() {
        this.API_URL = environment.API_BASE_URL;
        console.log(this.API_URL);
    }

    /**
     * This function fetches the Google Analytics accounts and properties for a user.
     * 
     * @param userId The user's id
     * @returns A collection of Google Analytics accounts and properties
     */
    async getUserGaAccounts(userId: number): Promise<any> {
        const response = await fetch(`${this.API_URL}/users/google-accounts/${userId}`, {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Failed to fetch Google Analytics accounts");
        }

        return await response.json();
    }

}

export default GoogleService;