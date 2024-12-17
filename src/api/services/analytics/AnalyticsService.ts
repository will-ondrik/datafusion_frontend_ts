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
}

export default AnalyticsService;