import React from 'react';
import './overview_metrics.css';
import { GaDataProps } from '../../../types/props/Props';
//import { MetricData } from '../../../api/dtos/analytics_dtos';
import { sortMetricData, formatMetricsForCards } from '../../../utils/utils';
import { LineChart } from '../../charts/line_chart';


const OverviewMetrics: React.FC<GaDataProps> = ({ data }) => {
    if (!data) {
        return <div>No data available for the overview tab.</div>;
    }

    // Deconstruct the data into current and comparison period data
    const { currPeriod: currPeriodData, compPeriod: compPeriodData } = data;
    console.log('currPeriodData', currPeriodData);
    const [currCardsData, currChartData, currGeoData, currPieData] = currPeriodData.data;
    const [compCardsData, compChartData, compGeoData, compPieData] = compPeriodData.data;

    // Group cards data by metric type        
    const { totalUsers: totalUsersCurr, sessions: sessionsCurr, screenPageViews: screenPageViewsCurr } = sortMetricData(currCardsData, ['totalUsers', 'sessions', 'screenPageViews']);
    const { totalUsers: totalUsersComp, sessions: sessionsComp, screenPageViews: screenPageViewsComp } = sortMetricData(compCardsData, ['totalUsers', 'sessions', 'screenPageViews']);

    // Group chart data by metric type
    const { sessions: sessionsChartData, totalUsers: totalUsersChartData } = sortMetricData(currChartData, ['sessions', 'totalUsers']);
    const { sessions: sessionsCompChartData, totalUsers: totalUsersCompChartData } = sortMetricData(compChartData, ['sessions', 'totalUsers']);

    // Group geo data by metric type
    const geoDataCurr = sortMetricData(currGeoData, ['totalUsers']);
    const geoDataComp = sortMetricData(compGeoData, ['totalUsers']);

    // Group pie data by metric type
    const pieDataCurr = sortMetricData(currPieData, ['sessions']);
    const pieDataComp = sortMetricData(compPieData, ['sessions']);

    console.log('Logging all sorted metrics...');
    console.log('totalUsersCurr', totalUsersCurr);
    console.log('totalUsersCompChartData', totalUsersCompChartData);

    console.log('sessionsCurr', sessionsCurr);
    console.log('sessionsComp', sessionsComp);

    console.log('screenPageViewsCurr', screenPageViewsCurr);
    console.log('screenPageViewsComp', screenPageViewsComp);

    console.log('sessionsChartData', sessionsChartData);
    console.log('sessionsCompChartData', sessionsCompChartData);

    console.log('totalUsersChartData', totalUsersChartData);
    console.log('totalUsersCompChartData', totalUsersCompChartData);

    console.log('geoDataCurr', geoDataCurr);
    console.log('geoDataComp', geoDataComp);

    console.log('pieDataCurr', pieDataCurr);
    console.log('pieDataComp', pieDataComp);


    const chartDataSessionsCurr = formatMetricsForCards(sessionsCurr)
    return (
        <div>
            <div className='sessions-card'>
            </div>
        </div>
    );
};

export default OverviewMetrics;
