import React from 'react';
import { GaDataProps } from '../../../types/props/Props';
import { FormattedGaData } from '../../../api/dtos/analytics_dtos';
import LineChart from '../../charts/line_chart';
import DataTable from '../../tables/table';
import Spinner from '../../animations/spinner/spinner';

const PageTrafficMetrics: React.FC<{ data: FormattedGaData }> = ({ data }) => {
    const { cardsData, tableData, geoData } = data;

    const sessions = {
        curr: cardsData.currMap['sessions'] || { name: 'sessions', labels: [], dataPoints: [] },
        comp: cardsData.compMap['sessions'] || { name: 'sessions', labels: [], dataPoints: [] },
    };
    const pageViews = {
        curr: cardsData.currMap['screenPageViews'] || { name: 'screenPageViews', labels: [], dataPoints: [] },
        comp: cardsData.compMap['screenPageViews'] || { name: 'screenPageViews', labels: [], dataPoints: [] },
    };
    const bounceRate = {
        curr: cardsData.currMap['bounceRate'] || { name: 'bounceRate', labels: [], dataPoints: [] },
        comp: cardsData.compMap['bounceRate'] || { name: 'bounceRate', labels: [], dataPoints: [] },
    };



    return (
        <div id="metrics">
            {/* Top Metrics */}
            <div id="cards">
                {/* Sessions */}
                <div className="card">
                    <div className="metric-graph">
                        <div className="metric-icon">
                            <img className="metricIcon" alt="icon" />
                            <div className="metricName">Sessions</div>
                        </div>
                        <div className="metric">
                            <LineChart chartData={sessions} isLoading={!cardsData.currMap['sessions']} />
                        </div>
                    </div>
                </div>

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
            </div>

            {/* Page Performance Analysis */}
            <div id="big-chart">
                <div id="chart">Page Performance Analysis</div>
                <table>
                    <thead>
                        <tr>
                            <th>Region</th>
                            <th>Sessions</th>
                            <th>Page Views</th>
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
            <div id="map-pie">
                {/* Geomap of Page Traffic by Region */}
                <div id="map">
                   {/* {geoData ? (
                        <div>Geomap of Page Traffic by Region</div>
                    ) : (
                        <div>No geographic data available.</div>
                    )} */}
                </div>

                {/* Pie Chart of Page Traffic Sources */}
                <div id="pie">
                   {/* {trafficSourceData ? (
                        <div>Pie Chart of Page Traffic Sources</div>
                    ) : (
                        <div>No traffic source data available.</div>
                    )} */}
                </div>
            </div>
        </div>
    );
};

export default PageTrafficMetrics;
