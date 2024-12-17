import { environment } from "../../../environment/environment";
import { GaRequest } from "./AnalyticsDtos";
class AnalyticsService {
    private API_URL: string | null = null;

    constructor() {
        this.API_URL = environment.API_BASE_URL;
        console.log(this.API_URL);
    }

    /**
     * Retrieves Google Analytics data for a selected user property.
     * 
     * @param gaRequest 
     * @returns // needs to be updated type for reports
     */
    async getDashboardData( gaRequest: GaRequest ): Promise<any> {
        try {
            const response = await fetch(`${this.API_URL}/analytics/data`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(gaRequest),
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.error);
            }
            return result.data;
        } catch(err) {
            console.error("Error fetching Google Analytics data", err);
        }
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

    /**
     * This function fetches the Google Analytics accounts and properties for a user.
     * 
     * @returns A collection of Google Analytics accounts and properties
     */
    async getGaAccountsAndProperties(): Promise<any> {
        try {
            const response = await fetch(`${this.API_URL}/analytics/accounts`, {
                method: "GET",
                credentials: "include",
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.error);
            }
            return result.data;
        } catch(err) {
            console.error("Error fetching Google Accounts and Properties", err);
        }
    }

    /**
     * This function saves the selected user Google Analytics accounts and properties.
     * 
     * @param selectedAccounts A collection of selected Google Analytics accounts and properties.
     * @returns A promise that resolves to a success or error message.
     */
    async saveGaAccountsAndProperties(selectedAccounts: any): Promise<any> {
        const payload = {
            accounts: selectedAccounts,
        };

        try {
            const response = await fetch(`${this.API_URL}/analytics/accounts`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.error);
            }
            return result.message;
        } catch(err) {
            console.error("Error saving Google Accounts and Properties", err);
        }
    }
}

export default AnalyticsService;