import React from 'react';
import { GaDataProps } from '../../../types/props/Props';
import { FormattedGaData } from '../../../api/dtos/analytics_dtos';
import LineChart from '../../charts/line_chart';

const TimeLocationMetrics: React.FC<{ data: FormattedGaData }> = ({ data }) => {
    
    const { cardsData, tableData, geoData } = data;

    const sessions = {
        curr: cardsData.currMap['sessions'] || { name: 'sessions', labels: [], dataPoints: [] },
        comp: cardsData.compMap['sessions'] || { name: 'sessions', labels: [], dataPoints: [] },
    };
    const pageViews = {
        curr: cardsData.currMap['screenPageViews'] || { name: 'screenPageViews', labels: [], dataPoints: [] },
        comp: cardsData.compMap['screenPageViews'] || { name: 'screenPageViews', labels: [], dataPoints: [] },
    };
    const totalUsers = {
        curr: cardsData.currMap['totalUsers'] || { name: 'totalUsers', labels: [], dataPoints: [] },
        comp: cardsData.compMap['totalUsers'] || { name: 'totalUsers', labels: [], dataPoints: [] },
    };


    return (
        <div id="metrics">
            {/* Top Metrics */}
            <div id="cards">
                {/* Sessions By Hour */}
                <div className="card">
                    <div className="metric-graph">
                        <div className="metric-icon">
                            <img className="metricIcon" alt="icon" />
                            <div className="metricName">Sessions By Hour</div>
                        </div>
                        <div className="metric">
                            <LineChart chartData={sessions} isLoading={!cardsData.currMap['sessions']} />
                        </div>
                    </div>
                </div>

                {/* Page Views by Day */}
                <div className="card">
                    <div className="metric-graph">
                        <div className="metric-icon">
                            <img className="metricIcon" alt="icon" />
                            <div className="metricName">Page Views by Day</div>
                        </div>
                        <div className="metric">
                            <LineChart chartData={pageViews} isLoading={!cardsData.currMap['screenPageViews']} />
                        </div>
                    </div>
                </div>

                {/* Users by Region */}
                <div className="card">
                    <div className="metric-graph">
                        <div className="metric-icon">
                            <img className="metricIcon" alt="icon" />
                            <div className="metricName">Users by Region</div>
                        </div>
                        <div className="metric">
                            <LineChart chartData={totalUsers} isLoading={!cardsData.currMap['totalUsers']} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Time Trends Analysis */}
            <div id="big-chart">
                <div id="chart">Time Trends Analysis</div>
                {/* Render your chart using timeTrendsData */}
            </div>

            {/* Geomap and Pie Chart */}
            <div id="map-pie">
                {/* Geomap of Users by Country */}
                <div id="map">
                   {/* {geoData ? (
                        <div>Geomap of Users by Country</div>
                    ) : (
                        <div>No geographic data available.</div>
                    )} */}
                </div>

                {/* Pie Chart of Sessions by Hour */}
                <div id="pie">
                   {/* {sessionByHourData ? (
                        <div>Pie Chart of Sessions by Hour</div>
                    ) : (
                        <div>No session by hour data available.</div>
                    )} */}
                </div>
            </div>
        </div>
    );
};

export default TimeLocationMetrics;
