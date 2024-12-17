import { createContext, useContext, useEffect, useState } from 'react';
import { useGaAccounts } from './GaAccountsContext';
import { ProviderProps } from '../types/props/ProviderProp';
import AnalyticsService from '../api/services/analytics/AnalyticsService';
import { GaRequest, GaTimePeriod } from '../api/services/analytics/AnalyticsDtos';

/** Context type definition */
interface GaDataContextType {
    tabData: Record<string, any>;
    activeTab: string | null;
    setActiveTab: React.Dispatch<React.SetStateAction<string | null>>;
    startPeriod: GaTimePeriod | null;
    comparisonPeriod: GaTimePeriod | null;
    isLoading: boolean;
    error: unknown;
}

/** Default values for the GaDataContext */
const GaDataContext = createContext<GaDataContextType | null>(null);

/**
 * GaDataProvider
 * @param param0 
 * @returns 
 */
export const GaDataProvider: React.FC<ProviderProps> = ({ children }) => {
    // State variables
    const [tabData, setTabData] = useState<Record<string, any>>({});
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const [startPeriod, setStartPeriod] = useState<GaTimePeriod | null>(null);
    const [comparisonPeriod, setComparisonPeriod] = useState<GaTimePeriod | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>(null);

    // External service and context
    const analyticsService = new AnalyticsService();
    const { defaultAccount, defaultProperty, isLoading: accountsLoading } = useGaAccounts();

    /**
     * Formats a date object to "YYYY-MM-DD" format.
     * @param date A Date object
     * @returns A formatted date string
     */
    const formatDate = (date: Date): string => {
        return date.toISOString().split('T')[0];
    };

    /**
     * Generates the default start and end dates (last 30 days).
     * @returns A GaTimePeriod object with start and end dates
     */
    const generateDefaultStartPeriod = (): GaTimePeriod => {
        const endDate = new Date();
        const startDate = new Date(endDate);
        startDate.setDate(endDate.getDate() - 30);
        return {
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
        };
    };

    /**
     * Generates a comparison period based on the given start period.
     * @param startPeriod The current start period
     * @returns A GaTimePeriod object representing the comparison period
     */
    const generateComparisonPeriod = (startPeriod: GaTimePeriod): GaTimePeriod => {
        const duration = new Date(startPeriod.endDate).getTime() - new Date(startPeriod.startDate).getTime();
        const comparisonStartDate = new Date(new Date(startPeriod.startDate).getTime() - duration);
        const comparisonEndDate = new Date(new Date(startPeriod.startDate).getTime() - 1);
        return {
            startDate: formatDate(comparisonStartDate),
            endDate: formatDate(comparisonEndDate),
        };
    };

    /**
     * Fetches Google Analytics data for a specific tab.
     * @param tabName The name of the active tab
     * @param startPeriod The start period for the data
     * @param comparisonPeriod The comparison period
     */
    const fetchGaDataForTab = async (
        tabName: string,
        startPeriod: GaTimePeriod,
        comparisonPeriod: GaTimePeriod
    ) => {
        setIsLoading(true);
        setError(null);

        const defaultPropertyId = defaultProperty?.propertyId ?? "";

        const payload: GaRequest = {
            propertyId: defaultPropertyId,
            tabName,
            startPeriod,
            comparisonPeriod,
            timeframe: 'date', // static - need to make it dynamic
        };

        try {
            const result = await analyticsService.getDashboardData(payload);

            setTabData((prevData) => ({...prevData, [tabName]: {
                    ...prevData[tabName], [`${startPeriod.startDate}-${startPeriod.endDate}`]: {
                        data: [result],
                        startPeriod,
                        comparisonPeriod,
                    },
                },
            }));
        } catch (err) {
            console.error('Failed to fetch GA data:', err);
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    /** Initialize start and comparison periods when the provider mounts */
    useEffect(() => {
        const defaultStartPeriod = generateDefaultStartPeriod();
        const defaultComparisonPeriod = generateComparisonPeriod(defaultStartPeriod);
        setStartPeriod(defaultStartPeriod);
        setComparisonPeriod(defaultComparisonPeriod);
    }, []);

    /** Fetch data for the active tab when dependencies change */
    useEffect(() => {
        if (accountsLoading || !defaultProperty || !activeTab || !startPeriod || !comparisonPeriod) {
            return;
        }

        const tabCache = tabData[activeTab]?.[`${startPeriod.startDate}-${startPeriod.endDate}`];

        if (!tabCache) {
            fetchGaDataForTab(activeTab, startPeriod, comparisonPeriod);
        }
    }, [activeTab, startPeriod, comparisonPeriod, accountsLoading, defaultProperty]);

    /** Provide the state and functions through the context */
    return (
        <GaDataContext.Provider
            value={{
                tabData,
                activeTab,
                setActiveTab,
                startPeriod,
                comparisonPeriod,
                isLoading,
                error,
            }}
        >
            {children}
        </GaDataContext.Provider>
    );
};

/**
 * Custom hook to consume the GaDataContext.
 * @returns The GaDataContext value
 */
export const useGaData = (): GaDataContextType => {
    const context = useContext(GaDataContext);
    if (!context) {
        throw new Error('useGaData must be used within a GaDataProvider');
    }
    return context;
};