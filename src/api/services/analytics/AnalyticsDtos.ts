/**
 * GaTimePeriod is a data transfer object that is used to represent a time period in Google Analytics.
 */
export interface GaTimePeriod {
    startDate: string;
    endDate: string;
}

/**
 * GaRequest is a data transfer object that is used to request data from the Google Analytics API.
 */
export interface GaRequest {
    propertyId: string;
    tabName: string;
    startPeriod: GaTimePeriod;
    comparisonPeriod: GaTimePeriod;
    timeframe: string;
}
