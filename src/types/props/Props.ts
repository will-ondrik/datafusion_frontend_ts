import { ReactNode } from 'react';
import { GaReportsResponse } from '../../api/dtos/analytics_dtos';
import { MetricData } from '../../api/dtos/analytics_dtos';
/**
 * Define the shape of the ProviderProps
 * 
 * This interface is used for contexts that provide a value to their children.
 */
export interface ProviderProps {
    children: ReactNode;
}

/**
 * Define the shape of the GaDataProps
 * 
 * This interface is used for components that receive Google Analytics data.
 */
export interface GaDataProps {
    data: GaReportsResponse;
}


export interface LineChartProps {
    name: string
    currLabels: string[];
    currDataPoints: number[];
    compDataPoints: number[];
    
}

export interface TableProps {
    sessions: MetricData
    totalUsers: MetricData
    engagementRate: MetricData
    screenPageViews: MetricData
  }