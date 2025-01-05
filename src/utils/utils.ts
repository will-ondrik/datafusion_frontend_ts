import { TableMap, ChartRecord, dimensionName, dimensionValue, GaReport, GeoMap, MapRecord, MetricData, MetricRecord, metricValue } from "../api/dtos/analytics_dtos";
import { TableProps } from "../types/props/Props";
/**
 * Sorts metrics for charts, grouping each inner array of data by metric.type.
 * Returns a 2D array (MetricRecord[][]).
 *//**
 * Sorts metrics for charts, grouping each inner array of data by metric.type.
 * Returns a 2D array (MetricRecord[][]).
 */export const formatCardMetrics = (reports: MetricData[][]) => {


  const currCardData = reports[0]
 
  let currMap: { [key: string]: MetricRecord } = {};
  currCardData.forEach((metricData: MetricData) => {
    // Create a new metric record if it doesn't exist
    if (!currMap[metricData.type]) {
      currMap[metricData.type] = {
        name: metricData.type,
        labels: [],
        dataPoints: [],
      };
    }

    const dimensionValue = formatGaDates(Object.values(metricData.dimension)[0]);
    const metricValue = Object.values(metricData.metric)[0];

    // If the metric record exists, add the dimension and metric values to their respective arrays
    currMap[metricData.type].labels.push(String(dimensionValue));
    currMap[metricData.type].dataPoints.push(Number(metricValue));
  });

  // Extract comparison card data and aggregate by metric type
  const compCardData = reports[1]
  
  let compMap: { [key: string]: MetricRecord } = {};
  compCardData.forEach((metricData: MetricData) => {
    // Create a new metric record if it doesn't exist
    if (!compMap[metricData.type]) {
      compMap[metricData.type] = {
        name: metricData.type,
        labels: [],
        dataPoints: [],
      };
    }

    const dimensionValue = formatGaDates(Object.values(metricData.dimension)[0]);
    const metricValue = Object.values(metricData.metric)[0];

    // If the metric record exists, add the dimension and metric values to their respective arrays
    compMap[metricData.type].labels.push(String(dimensionValue));
    compMap[metricData.type].dataPoints.push(Number(metricValue));
  });

  // Return results
  return { currMap, compMap };
};
  



/**
 * Formats metric and dimension data for card charts
 * 
 * @param metricData - Metric data to be formatted
 * @returns - Object containing a name (GA4 metric name), labels and data points for card charts
 */
export const formatTableMetrics = (reports: MetricData[][]): TableMap => {

  const currMap: TableMap = {};

    const currChartData = reports[0]
    if (!currChartData){
      return currMap;
    }

    const currNumEntries = currChartData.length / 5; // 5 items per entry
    const currEntries: TableProps[] = [];

    for (let i = 0; i < currNumEntries; i++) {
      const entry: Partial<TableProps> = {};

      currChartData.forEach((metricData: MetricData) => {        
        if (metricData.type === 'sessions') {
          entry.sessions = metricData;
        } else if (metricData.type === 'totalUsers') {
          entry.totalUsers = metricData;
        } else if (metricData.type === 'engagementRate') {
          entry.engagementRate = metricData;
        } else if (metricData.type === 'screenPageViews') {
          entry.screenPageViews = metricData;
        }
      });

      currEntries.push((entry as TableProps));
    }  


    // Aggregate current data by dimension (url)
    for (const row of currEntries) {

      const entry: ChartRecord = {
        name: Object.values(row.engagementRate.dimension)[1],
        numSessions: Object.values(row.sessions.metric)[0],
        numUsers: Object.values(row.totalUsers.metric)[0],
        engagementRate: Object.values(row.engagementRate.metric)[0],
        numViews: Object.values(row.screenPageViews.metric)[0],
      }

      if (!currMap[entry.name]) {
        currMap[entry.name] = entry;
      } else {
        currMap[entry.name].numSessions += entry.numSessions;
        currMap[entry.name].numUsers += entry.numUsers;
        currMap[entry.name].engagementRate += entry.engagementRate;
        currMap[entry.name].numViews += entry.numViews;
      }
    }

    return currMap;
}


export const formatMetricsForTable = (reports: GaReport[]) => {
    const  currChartData = reports?.[0].reports?.[1];


    const compChartData = reports?.[1].reports?.[1];
    
}

export const formatGeoMetrics = (reports: MetricData[][]): GeoMap => {
    const  currChartData = reports[0]
    const compMap: GeoMap = {};
    currChartData.forEach((metricData: MetricData) => {
      const entry: MapRecord = {
        country: Object.values(metricData.dimension)[1],
        sessions: Object.values(metricData.metric)[0],
      }

      if (!compMap[entry.country]) {
        compMap[entry.country] = entry;
      } else {
        compMap[entry.country].sessions += entry.sessions;
      }
    });

    return compMap;
}

export const formatMetricsForPieChart = (reports: GaReport[]) => {
    const  currChartData = reports?.[0].reports?.[1];


    const compChartData = reports?.[1].reports?.[1];
}


export const formatGaDates = (date: string) => {
  if (!date || date.length !== 8) {
      console.error('Invalid date format:', date);
      return 'Invalid Date';
  }

  const year = date.substring(0, 4);
  const month = date.substring(4, 6);
  const day = date.substring(6, 8);

  const parsedDate = new Date(`${year}-${month}-${day}`);
  if (isNaN(parsedDate.getTime())) {
      console.error('Invalid parsed date:', parsedDate);
      return 'Invalid Date';
  }

  const newDate = parsedDate.toString().split(' ');
  return `${newDate[1]} ${newDate[2]}, ${newDate[3]}`;
};
