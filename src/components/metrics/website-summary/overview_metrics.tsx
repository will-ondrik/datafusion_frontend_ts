import React from 'react';
import './overview_metrics.css';
import { FormattedGaData } from '../../../api/dtos/analytics_dtos';
import { LineChart } from '../../charts/line_chart';
import DataTable from '../../tables/table';
import GeoChart from '../../charts/geo_chart';
import InsightsText from '../../insights/insights_text';
import { useGaData } from '../../../context/ga_data_context';
import PulseText from '../../animations/pulse/pulse';

const OverviewMetrics: React.FC<{ data: FormattedGaData }> = ({ data }) => {
    const gaData = useGaData();

    const { cardsData, tableData, geoData } = data;

    const sessionsData = {
        curr: cardsData.currMap['sessions'] || { name: 'sessions', labels: [], dataPoints: [] },
        comp: cardsData.compMap['sessions'] || { name: 'sessions', labels: [], dataPoints: [] },
    };
    const usersData = {
        curr: cardsData.currMap['totalUsers'] || { name: 'totalUsers', labels: [], dataPoints: [] },
        comp: cardsData.compMap['totalUsers'] || { name: 'totalUsers', labels: [], dataPoints: [] },
    };
    const viewsData = {
        curr: cardsData.currMap['screenPageViews'] || { name: 'screenPageViews', labels: [], dataPoints: [] },
        comp: cardsData.compMap['screenPageViews'] || { name: 'screenPageViews', labels: [], dataPoints: [] },
    };

    const startPeriod = gaData.startPeriod
    const insights = gaData.tabData['overview']?.[`${startPeriod?.startDate}-${startPeriod?.endDate}`].insights;
    

    return (
        <div>
            <div id="cards">
                <div className="card">
                    <div className="metric-graph">
                        <div className="metric-icon">
                            <img className="metricIcon" alt="icon" />
                            <div className="metricName">Sessions</div>
                        </div>
                        <div className="metric">
                            <LineChart chartData={sessionsData} isLoading={!cardsData.currMap['sessions']} />
                        </div>
                        <div className="insights">
                            {insights?.['sessions'] ? (
                                <InsightsText data={insights['sessions']} />

                            ): (
                                <PulseText text={"Generating insights..."} />
                            )}
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="metric-graph">
                        <div className="metric-icon">
                            <img className="metricIcon" alt="icon" />
                            <div className="metricName">Total Users</div>
                        </div>
                        <div className="metric">
                            <LineChart chartData={usersData} isLoading={!cardsData.currMap['totalUsers']} />
                        </div>
                        <div className="insights">
                            {insights?.['totalUsers'] ? (
                                <InsightsText data={insights['totalUsers']} />

                            ): (
                                <PulseText text={"Generating insights..."} />
                            )}
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="metric-graph">
                        <div className="metric-icon">
                            <img className="metricIcon" alt="icon" />
                            <div className="metricName">Views</div>
                        </div>
                        <div className="metric">
                            <LineChart chartData={viewsData} isLoading={!cardsData.currMap['screenPageViews']} />
                        </div>
                        <div className="insights">
                            {insights?.['screenPageViews'] ? (
                                <InsightsText data={insights['screenPageViews']} />

                            ): (
                                <PulseText text={"Generating insights..."} />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* DataTable Section */}
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>URL</th>
                            <th>Engagement Rate</th>
                            <th>Views</th>
                            <th>Sessions</th>
                            <th>Users</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(tableData).length ? (
                            <DataTable data={tableData} />
                        ) : (
                            <tr>
                                <td colSpan={5} style={{ textAlign: 'center' }}>
                                    Loading...
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* GeoChart Section */}
            <div>
                <h2>Sessions by Country</h2>
                <div>
                    {Object.keys(geoData).length ? (
                        <GeoChart data={geoData} />
                    ) : (
                        <div style={{ textAlign: 'center' }}>Loading Geo Data...</div>
                    )}
                </div>
            </div>
            
        </div>
    );
};

export default OverviewMetrics;
