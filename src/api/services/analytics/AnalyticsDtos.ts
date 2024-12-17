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
    propertyId: string | null;
    googleAccountId: string | null;
    isDefault: boolean | null;
}