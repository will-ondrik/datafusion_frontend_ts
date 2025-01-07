import { createContext, useContext, useEffect, useState } from 'react';
import { useGaAccounts } from './ga_accounts_context';
import { ProviderProps } from '../types/props/Props';
import AnalyticsService from '../api/services/analytics_service';
import { GaReportsResponse, GaRequest, GaTimePeriod, FormattedGaData, GaReport, CardsMetrics, TableMap, GeoMap } from '../api/dtos/analytics_dtos';
import { formatCardMetrics, formatGeoMetrics, formatTableMetrics } from '../utils/utils';

/** Context type definition */
interface GaDataContextType {
    tabData: Record<string, any>;
    activeTab: string | null;
    setActiveTab: React.Dispatch<React.SetStateAction<string | null>>;
    startPeriod: GaTimePeriod | null;
    setStartPeriod: React.Dispatch<React.SetStateAction<GaTimePeriod | null>>;
    comparisonPeriod: GaTimePeriod | null;
    setComparisonPeriod: React.Dispatch<React.SetStateAction<GaTimePeriod | null>>;
    isLoading: boolean;
    error: unknown;
}

/** Default values for the GaDataContext */
const GaDataContext = createContext<GaDataContextType | null>(null);

export const GaDataProvider: React.FC<ProviderProps> = ({ children }) => {
    const [tabData, setTabData] = useState<Record<string, any>>({});
    const [activeTab, setActiveTab] = useState<string | null>('overview');
    const [startPeriod, setStartPeriod] = useState<GaTimePeriod | null>(null);
    const [comparisonPeriod, setComparisonPeriod] = useState<GaTimePeriod | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>(null);

    const analyticsService = new AnalyticsService();
    const { defaultProperty, isLoading: accountsLoading } = useGaAccounts();

    const formatDate = (date: Date): string => date.toISOString().split('T')[0];

    /**
     * Generates a date range used as a default to fetch Google Analytics data.
     * Users will see data from this date range until choosing a new date range via menu.
     * 
     * @returns GaTimePeriod Object
     */
    const generateDefaultStartPeriod = (): GaTimePeriod => {
        const endDate = new Date();
        const startDate = new Date(endDate);
        startDate.setDate(endDate.getDate() - 60);
        return {
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
        };
    };

    /**
     * Generates a date range used to fetch Google Analytics data.
     * The returned GaTimePeriod contains the date range used to fetch comparison period data.
     * 
     * @param startPeriod 
     * @returns GaTimePeriod Object
     */
    const generateComparisonPeriod = (startPeriod: GaTimePeriod): GaTimePeriod => {
        const duration = new Date(startPeriod.endDate).getTime() - new Date(startPeriod.startDate).getTime();
        const startDate = new Date(new Date(startPeriod.startDate).getTime() - duration);
        const endDate = new Date(new Date(startPeriod.startDate).getTime() - 1);

        return {
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
        };
    };

    /**
     * Conducts formatting of Google Analytics data to correspond with various data visualization components.
     * 
     * @param batchReports - Google Analytics API Batch Reports
     * @returns FormattedGaData - formatted data for data visualization components.
     */
    const formatDataForDisplay = (batchReports: GaReportsResponse): FormattedGaData => {
        console.log('formatDataForDisplay:', batchReports);
        const currPeriod: GaReport = {
            metricTotals: batchReports.currPeriod?.metricTotals || {},
            reports: batchReports.currPeriod?.reports || [],
        };

        const compPeriod: GaReport = {
            metricTotals: batchReports.compPeriod?.metricTotals || {},
            reports: batchReports.compPeriod?.reports || [],
        };

        const rawCardsData = [currPeriod.reports[0], compPeriod.reports[0]];
        const rawTableData = [currPeriod.reports[1]];
        const rawGeoData = [currPeriod.reports[2]];

        const cardsData: CardsMetrics = formatCardMetrics(rawCardsData);
        const tableData: TableMap = formatTableMetrics(rawTableData);
        const geoData: GeoMap = formatGeoMetrics(rawGeoData);

        return { cardsData, tableData, geoData };
    };

    /**
     * Fetches Google Analytics data based on the selected Dashboard tab.
     * 
     * @param tabName - Tab from the Dashboard page.
     * @param startPeriod - Date range for the current period's data.
     * @param comparisonPeriod - Date range for the comparison period's data (used to provide insights on increases/decreases in metric values.).
     */
    const fetchGaDataForTab = async (
        tabName: string,
        startPeriod: GaTimePeriod,
        comparisonPeriod: GaTimePeriod
    ) => {
        setIsLoading(true);
        setError(null);
        try {
            const defaultPropertyId = defaultProperty?.id ?? "";

            const payload: GaRequest = {
                propertyId: defaultPropertyId,
                tabName,
                startPeriod,
                comparisonPeriod,
                timeframe: 'date',
            };

            // Fetch Google Analytics data
            const result: Error | GaReportsResponse = await analyticsService.getDashboardData(payload);
            if (result instanceof Error) {
                throw result;
            }
            // Format Google Analytics data
            const { cardsData, tableData, geoData } = formatDataForDisplay(result);

            // Cache Google Analytics data
            setTabData((prevData) => {
                const updatedData = {
                    ...prevData,
                    [tabName]: {
                        ...prevData[tabName],
                        [`${startPeriod.startDate}-${startPeriod.endDate}`]: {
                            data: { cardsData, tableData, geoData },
                            startPeriod,
                            comparisonPeriod,
                        },
                    },
                };
                console.log('Updated tabData:', updatedData);
                return updatedData;
            });
        } catch (err) {
            console.error('Failed to fetch GA data:', err);
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log('tabData updated:', tabData);
    }, [tabData]);

    /**
     * Use Effect checks for required data before:
     * 
     *  1) Checking for existing Google Analytics data in the cache.
     *  2) Fetching Google Analytics data if tab data doesn't exist.
     */
    useEffect(() => {
        if (accountsLoading || !defaultProperty || !activeTab || !startPeriod || !comparisonPeriod) return;

        const tabCache = tabData[activeTab]?.[`${startPeriod.startDate}-${startPeriod.endDate}`];
        if (!tabCache) {
            fetchGaDataForTab(activeTab, startPeriod, comparisonPeriod);
        }
    }, [activeTab, startPeriod, comparisonPeriod, accountsLoading, defaultProperty]);

    /**
     * Use Effect generates and sets date ranges for current/comparison period date ranges.
     * 
     * TODO: Only generate a default start period if the user hasn't selected one.
     */
    useEffect(() => {
        const defaultStartPeriod = generateDefaultStartPeriod();
        const defaultComparisonPeriod = generateComparisonPeriod(defaultStartPeriod);
        setStartPeriod(defaultStartPeriod);
        setComparisonPeriod(defaultComparisonPeriod);
    }, []);

    return (
        <GaDataContext.Provider
            value={{
                tabData,
                activeTab,
                setActiveTab,
                startPeriod,
                setStartPeriod,
                comparisonPeriod,
                setComparisonPeriod,
                isLoading,
                error,
            }}
        >
            {children}
        </GaDataContext.Provider>
    );
};

export const useGaData = (): GaDataContextType => {
    const context = useContext(GaDataContext);
    if (!context) {
        throw new Error('useGaData must be used within a GaDataProvider');
    }
    return context;
};
