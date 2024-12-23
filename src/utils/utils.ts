import { GaReport, MetricData, MetricRecord } from "../api/dtos/analytics_dtos";

/**
 * Sorts metrics for charts, grouping each inner array of data by metric.type.
 * Returns a 2D array (MetricRecord[][]).
 *//**
 * Sorts metrics for charts, grouping each inner array of data by metric.type.
 * Returns a 2D array (MetricRecord[][]).
 */export const sortMetricsForCharts = (reports: GaReport[]) => {

  // Extract comparison card data and aggregate by metric type
  const currCardData = reports[0]?.data?.[0];
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

    const dimensionValue = Object.values(metricData.dimension)[0];
    const metricValue = Object.values(metricData.metric)[0];

    // If the metric record exists, add the dimension and metric values to their respective arrays
    currMap[metricData.type].labels.push(String(dimensionValue));
    currMap[metricData.type].dataPoints.push(Number(metricValue));
  });

  // Extract comparison card data and aggregate by metric type
  const compCardData = reports[1]?.data?.[0];
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

    const dimensionValue = Object.values(metricData.dimension)[0];
    const metricValue = Object.values(metricData.metric)[0];

    // If the metric record exists, add the dimension and metric values to their respective arrays
    compMap[metricData.type].labels.push(String(dimensionValue));
    compMap[metricData.type].dataPoints.push(Number(metricValue));
  });

  // Return results
  console.log("Current Map:", currMap);
  console.log("Comparison Map:", compMap);
  return { currMap, compMap };
};
  


/**
 * Formats metric and dimension data for card charts
 * 
 * @param metricData - Metric data to be formatted
 * @returns - Object containing a name (GA4 metric name), labels and data points for card charts
 */
export const formatMetricsForCharts = (reports: GaReport[]) => {
    const  currChartData = reports?.[0].data?.[1];


    const compChartData = reports?.[1].data?.[1];

}


export const formatMetricsForTable = (reports: GaReport[]) => {
    const  currChartData = reports?.[0].data?.[1];


    const compChartData = reports?.[1].data?.[1];
    
}

export const formatMetricsForGeoMap = (reports: GaReport[]) => {
    const  currChartData = reports?.[0].data?.[1];


    const compChartData = reports?.[1].data?.[1];
}

export const formatMetricsForPieChart = (reports: GaReport[]) => {
    const  currChartData = reports?.[0].data?.[1];


    const compChartData = reports?.[1].data?.[1];
}


