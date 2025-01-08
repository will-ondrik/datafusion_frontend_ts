import React from 'react';
import { GaDataProps } from '../../../types/props/Props';
import { FormattedGaData } from '../../../api/dtos/analytics_dtos';
import LineChart from '../../charts/line_chart';

const BehaviourMetrics: React.FC<{ data: FormattedGaData }> = ({ data }) => {
    console.log('BehaviourMetrics', data);
    const { cardsData, tableData, geoData } = data;

    const pageViews = {
        curr: cardsData.currMap['screenPageViews'] || { name: 'screenPageViews', labels: [], dataPoints: [] },
        comp: cardsData.compMap['screenPageViews'] || { name: 'screenPageViews', labels: [], dataPoints: [] },
    };
    const bounceRate = {
        curr: cardsData.currMap['bounceRate'] || { name: 'bounceRate', labels: [], dataPoints: [] },
        comp: cardsData.compMap['bounceRate'] || { name: 'bounceRate', labels: [], dataPoints: [] },
    };
    const newUsers = {
        curr: cardsData.currMap['newUsers'] || { name: 'newUsers', labels: [], dataPoints: [] },
        comp: cardsData.compMap['newUsers'] || { name: 'newUsers', labels: [], dataPoints: [] },
    };


    return (
        <div id="metrics">
            {/* Top Metrics */}
            <div id="cards">
                {/* Page Views */}
                <div className="card">
                    <div className="metric-graph">
                        <div className="metric-icon">
                            <img className="metricIcon" alt="icon" />
                            <div className="metricName">Page Views</div>
                        </div>
                        <div className="metric">
                            <LineChart chartData={pageViews} isLoading={!cardsData.currMap['screenPageViews']} />
                        </div>
                    </div>
                </div>

                {/* Bounce Rate */}
                <div className="card">
                    <div className="metric-graph">
                        <div className="metric-icon">
                            <img className="metricIcon" alt="icon" />
                            <div className="metricName">Bounce Rate</div>
                        </div>
                        <div className="metric">
                            <LineChart chartData={bounceRate} isLoading={!cardsData.currMap['bounceRate']} />
                        </div>
                    </div>
                </div>

                {/* Returning Users */}
                <div className="card">
                    <div className="metric-graph">
                        <div className="metric-icon">
                            <img className="metricIcon" alt="icon" />
                            <div className="metricName">Returning Users</div>
                        </div>
                        <div className="metric">
                            <LineChart chartData={newUsers} isLoading={!cardsData.currMap['newUsers']} />
                        </div>
                    </div>
                </div>
            </div>

            {/* User Flow Analysis */}
            <div id="big-chart">
                <div id="chart">User Flow Analysis</div>
                {/* Render your flow chart using userFlowData */}
            </div>

            {/* Geomap and Pie Chart */}
            <div id="map-pie">
                {/* Geomap of Bounce Rate by Region */}
                <div id="map">
                    {/*{geoData ? (
                        <div>Geomap of Bounce Rate by Region</div>
                    ) : (
                        <div>No geographic data available.</div>
                    )} */}
                </div>

                {/* Pie Chart of New vs Returning Users */}
                <div id="pie">
                   {/* {newVsReturningData ? (
                        <div>Pie Chart of New vs Returning Users</div>
                    ) : (
                        <div>No new vs returning data available.</div>
                    )} */}
                </div>
            </div>
        </div>
    );
};

export default BehaviourMetrics;
