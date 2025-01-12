import { environment } from "../../environment/environment";
import { InsightRequest } from "../dtos/analytics_dtos";

class AiService {
    private API_URL: string | null = null;

    constructor() {
        this.API_URL = environment.API_BASE_URL;
    }


    async getInsights(insightsRequests: InsightRequest): Promise<any> {
        console.log('INSIGHTS PAYLOAD', insightsRequests)
        try {
            const response = await fetch(`${this.API_URL}/ai/insights`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(insightsRequests)
            });

            if (!response.ok) {
                return new Error("Failed to fetch insights.");
            }

            const result = await response.json();
            console.log('INSIGHTS RESULT', result);
            return result.data;

        } catch (err) {
            console.error("Error fetching metric insights.");
            return new Error("Unknown API error.");
        }
    }


    async generateReport(): Promise<any> {
        try {
            const response = await fetch(`${this.API_URL}/ai/report`, {
                method: 'POST',
                credentials: 'include',
            });
        } catch (err) {
            console.error("Error fetching report content.");
            return new Error("Unknown API error.");
        }
    }
}


export default AiService;