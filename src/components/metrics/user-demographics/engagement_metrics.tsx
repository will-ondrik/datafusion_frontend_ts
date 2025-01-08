import React from 'react';
import { FormattedGaData } from '../../../api/dtos/analytics_dtos';
import { LineChart } from '../../charts/line_chart';
import DataTable from '../../tables/table';
import Spinner from '../../animations/spinner/spinner';
import GeoChart from '../../charts/geo_chart';

const EngagementMetrics: React.FC<{ data: FormattedGaData }> = ({ data }) => {
    console.log('EngagementMetrics', data);
    const { cardsData, tableData, geoData } = data;

    const avgSessionDurationData = {
        curr: cardsData.currMap['averageSessionDuration'] || { name: 'averageSessionDuration', labels: [], dataPoints: [] },
        comp: cardsData.compMap['averageSessionDuration'] || { name: 'averageSessionDuration', labels: [], dataPoints: [] },
    };
    const userEngagementDurationData = {
        curr: cardsData.currMap['userEngagementDuration'] || { name: 'userEngagementDuration', labels: [], dataPoints: [] },
        comp: cardsData.compMap['userEngagementDuration'] || { name: 'userEngagementDuration', labels: [], dataPoints: [] },
    };
    const engagementRateData = {
        curr: cardsData.currMap['engagementRate'] || { name: 'engagementRate', labels: [], dataPoints: [] },
        comp: cardsData.compMap['engagementRate'] || { name: 'engagementRate', labels: [], dataPoints: [] },
    };

    return (
        <div id="metrics">
            {/* Top Metrics */}
            <div id="cards">
                {/* Average Session Duration */}
                <div className="card">
                    <div className="metric-graph">
                        <div className="metric-icon">
                            <img className="metricIcon" alt="icon" />
                            <div className="metricName">Average Session Duration</div>
                        </div>
                        <div className="metric">
                           <LineChart chartData={avgSessionDurationData} isLoading={!cardsData.currMap['averageSessionDuration']} />
                        </div>
                    </div>
                </div>

                {/* User Engagement Duration */}
                <div className="card">
                    <div className="metric-graph">
                        <div className="metric-icon">
                            <img className="metricIcon" alt="icon" />
                            <div className="metricName">User Engagement Duration</div>
                        </div>
                        <div className="metric">
                            <LineChart chartData={userEngagementDurationData} isLoading={!cardsData.currMap['userEngagementDuration']} />
                        </div>
                    </div>
                </div>

                {/* Engagement Rate */}
                <div className="card">
                    <div className="metric-graph">
                        <div className="metric-icon">
                            <img className="metricIcon" alt="icon" />
                            <div className="metricName">Engagement Rate</div>
                        </div>
                        <div className="metric">
                            <LineChart chartData={engagementRateData} isLoading={!cardsData.currMap['engagementRate']} />
                        </div>
                    </div>
                </div>
            </div>

            {/* DataTable Section */}
            <h2 id="chart">Page Engagement Overview</h2>
            <div id="big-chart">
                <table>
                    <thead>
                        <tr>
                            <th>URL</th>
                            <th>Page Title</th>
                            <th>Sessions</th>
                            <th>Engaged Sessions</th>
                            <th>Bounce Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(tableData).length ? (
                            <DataTable data={tableData} />
                        ) : (
                            <tr>
                                <Spinner />
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Geomap and Pie Chart */}
            <div id='geoMap'>
                <h2>User Engagement by Country</h2>
                <div>
                    {Object.keys(geoData).length ? (
                        <GeoChart data={geoData} />
                    ) : (
                         <Spinner />
                    )}
                </div>
            </div>
        </div>
    );
};

export default EngagementMetrics;
