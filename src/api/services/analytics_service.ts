import { environment } from "../../environment/environment";
import { GaReportsResponse, GaRequest } from "../dtos/analytics_dtos";
class AnalyticsService {
    private API_URL: string | null = null;

    constructor() {
        this.API_URL = environment.API_BASE_URL;
    }

    /**
     * Retrieves Google Analytics data for a selected user property.
     * 
     * @param gaRequest 
     * @returns // TODO: // needs to be updated type for reports
     */
    async getDashboardData( gaRequest: GaRequest ): Promise<GaReportsResponse | Error> {
        try {
            const response = await fetch(`${this.API_URL}/analytics/data`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(gaRequest),
            });

            if (response.ok) {
                const result: { data: GaReportsResponse } = await response.json();
                return result.data;
            }

            const errData = await response.json()
            return new Error(errData.error || "An unknown error occurred.");
        } catch(err) {
            console.error("Error fetching Google Analytics data", err);
            return new Error("Unknown API error.")
        }
    }

    /**
     * Retrieves user Google Analytics accounts and properties.
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