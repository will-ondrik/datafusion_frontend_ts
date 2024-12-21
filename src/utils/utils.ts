import { MetricData } from "../api/dtos/analytics_dtos";
import { LineChartProps } from "../types/props/Props";

/**
 * Sorts metric data by metric type
 * 
 * @param data - Metric data to be sorted
 * @param metricsPayload - Array of metric names to sort data by
 * @returns - Object containing sorted metric data
 */
export const sortMetricData = (data: MetricData[], metricsPayload: string[]) => {

    // Init metrics object to hold sorted metrics data
    let metrics: { [key: string]: MetricData[] | null } = {};

    // Init metrics object with an empty array
    metricsPayload.forEach(metricName => {
        metrics[metricName] = [];
    });

    // Add data to metrics object
    for (let i = 0; i < data.length; i++) {
        if (metrics[data[i].type]) {
            metrics[data[i].type]?.push(data[i]);
        }
    }
    return metrics;
}


/**
 * Formats metric and dimension data for card charts
 * 
 * @param metricData - Metric data to be formatted
 * @returns - Object containing a name (GA4 metric name), labels and data points for card charts
 */
export const formatMetricsForCards = (metricData: MetricData[] | null) => {
    if (!metricData) { 
        return 
    }

    const chartData: LineChartProps = {
        name: metricData[0].type,   // Assign metric name
        labels: [],
        dataPoints: []
    }

    for (let i = 0; i < metricData.length; i++) {
        if (metricData[i].dimension) {
            // Extract dimension value
            chartData.labels.push(metricData[i].dimension[0]);
        }

        if (metricData[i].metric) {
            // Extract metric value
            chartData.dataPoints.push(metricData[i].metric[0]);
        }
    }
    return chartData;
}


export const formatMetricsForTable = (metricData: MetricData[]) => {
    
}

export const formatMetricsForGeoMap = (metricData: MetricData[]) => {

}

export const formatMetricsForPieChart = (metricData: MetricData[]) => {

}


