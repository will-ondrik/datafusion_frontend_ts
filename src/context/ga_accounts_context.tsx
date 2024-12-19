import { createContext, useContext, useEffect, useState } from "react";
import { ProviderProps } from "../types/props/Props";
import { GaAccount, GaProperty, GaAccountsContextType } from "../api/dtos/analytics_dtos";
import { useAuth } from "./auth_context";
import AnalyticsService from "../api/services/analytics_service";

/**
 * Create the GaAccountsContext with an initial value of null
 */
const GaAccountsContext = createContext<GaAccountsContextType | null>(null);

export const GaAccountsProvider: React.FC<ProviderProps> = ({ children }) => {
    const [accounts, setAccounts] = useState([]);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [defaultProperty, setDefaultProperty] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const analyticsService = new AnalyticsService();
    // Get the user ID from the AuthContext
    const { id } = useAuth();

    /**
     * Fetches the user's Google Analytics accounts and their corresponding properties.
     * 
     * @param userId The user's ID
     * 
     * @returns A Promise that resolves to an array of Google Analytics accounts.
     */
    const fetchGaAccounts = async(userId: number) => {
        setIsLoading(true);
        try {
            const result = await analyticsService.getUserGaAccounts(userId);
           setAccounts(result);

           // Set the default account
           const defaultAccount = result.Accounts.find((account: GaAccount) => account.isDefault);
           if (defaultAccount) {
            setDefaultAccount(defaultAccount);
           }

           // Set the default property
           const defaultProperty = defaultAccount.Properties.find((property: GaProperty) => property.isDefault);
              if (defaultProperty) {
                setDefaultProperty(defaultProperty);
              }
        } catch(err) {
            console.error("Failed to fetch GA accounts:", err);
        } finally {
            setIsLoading(false);
        }
    }

    // Call fetchGaAccounts on component mount
    useEffect(() => {
        if (!id) {
            return;
        }
        fetchGaAccounts(id);
    }, [id]); // Only call fetchGaAccounts when the user ID changes


    return (
        <GaAccountsContext.Provider value={{ accounts, defaultAccount, defaultProperty, isLoading }}>
            {children}
        </GaAccountsContext.Provider>
    )
}

// Custom hook to use the GaAccountsContext
export const useGaAccounts = () => {
    const context = useContext(GaAccountsContext);
    if (!context) {
        throw new Error("useGaAccounts must be used within a GaAccountsProvider");
    }
    return context;
}