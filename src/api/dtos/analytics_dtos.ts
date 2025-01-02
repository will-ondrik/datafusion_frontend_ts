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

/**
 * GaAccountsContextType represents the shape of the context that is used to store the Google Analytics accounts and properties.
 */
export interface GaAccountsContextType {
    accounts: GaAccount[];
    defaultAccount: GaAccount | null;
    defaultProperty: GaProperty | null;
    isLoading: boolean;
}

/**
 * GaAccount represents the shape of a Google Analytics account.
 */
export interface GaAccount {
    id: string | null;
    name: string | null;
    isDefault: boolean | null;
    kind: string | null;
    properties: GaProperty[] | [];
}

/**
 * GaProperty represents the shape of a Google Analytics property.
 */
export interface GaProperty {
    name: string | null;
    id: string | null;
    googleAccountId: string | null;
    isDefault: boolean | null;
}

/**
 * MetricData represents the shape of the row data returned from a Google Analytics report.
 */
export interface MetricData {
    type: metricType;
    dimension: { [key: dimensionName]: dimensionValue };
    metric: { [key: metricName]: metricValue };
}

/**
 * GaReport represents the shape of a formatted Google Analytics report.
 */
export interface GaReport {
    metricTotals: { [key: metricType]: metricValue };
    data: MetricData[][];
}

/**
 * GaReportsResponse represents the current period and comparison period reports for a specific dashboard tab.
 */
export interface GaReportsResponse {    
    currPeriod: GaReport;
    compPeriod: GaReport;
}

export type dimensionValue = string;
export type dimensionName = string;
export type metricType = string;
export type metricName = string
export type metricValue = number;

export interface MetricRecord {
    name: metricType;
    labels: dimensionValue[];
    dataPoints: metricValue[];
}


export interface ChartRecord {
    name: dimensionValue;
    numSessions: metricValue;
    numUsers: metricValue; 
    engagementRate: metricValue;
    numViews: metricValue;
}


export interface ChartMap {
    [key: dimensionName]: ChartRecord;
}

export interface GeoMap {
    [key: dimensionName]: MapRecord;
}

export interface MapRecord {
    //city: dimensionValue;
    country: dimensionValue;
    sessions: metricValue;
}