import { GeoMap, MapRecord, MetricData, MetricRecord } from "../api/dtos/analytics_dtos";
import { useGaData } from "../context/ga_data_context";

/** 
 * Sorts metrics for charts, grouping each inner array of data by metric.type.
 * Returns a 2D array (MetricRecord[][]).
 */
export const formatCardMetrics = (reports: MetricData[][]) => {
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
export const formatTableMetrics = (reports: MetricData[][]): any => {
  console.log('formatTableMetrics:', reports);
  const currMap: { [key: string]: MetricData } = {};

    const currChartData = reports[0]
    if (!currChartData){
      return currMap;
    }

    currChartData.forEach((metricData: MetricData) => {
      
      if (!currMap[metricData.type]){
        currMap[metricData.type] = metricData;
      } else {
        const metricValue = metricData.metric[Object.keys(metricData.metric)[0]];
        currMap[metricData.type].metric[Object.keys(metricData.metric)[0]] += metricValue;
      }

    });

    const dimMap: { [key: string]: MetricData } = {};
    Object.values(currMap).forEach((entry: any) => {

      const dimension = entry.dimension[Object.keys(entry.dimension)[1]];
      if (!dimMap[dimension]) {
        dimMap[dimension] = {
          type: entry.type,
          dimension: dimension,
          metric: { ...entry.metric }, // Add all metrics
        };
      } else {
        Object.keys(entry.metric).forEach((key) => {
          if (!dimMap[dimension].metric[key]) {
            dimMap[dimension].metric[key] = entry.metric[key];
          } else {
            dimMap[dimension].metric[key] += entry.metric[key];
          }
        });
      }
    });
    
    console.log("dimMap:", dimMap);
    return dimMap;
}


export const formatGeoMetrics = (reports: MetricData[][]): GeoMap => {
    console.log('formatGeoMetrics:', reports);
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
