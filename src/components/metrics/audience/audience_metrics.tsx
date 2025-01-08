import { FormattedGaData, GaReport } from "../../../api/dtos/analytics_dtos";
import { GaDataProps } from "../../../types/props/Props";
import Spinner from "../../animations/spinner/spinner";
import LineChart from "../../charts/line_chart";
import DataTable from "../../tables/table";

const AudienceMetrics: React.FC<{ data: FormattedGaData }> = ({ data }) => {
    const { cardsData, tableData, geoData} = data;

    const newUsers = {
        curr: cardsData.currMap['newUsers'] || { name: 'newUsers', labels: [], dataPoints: [] },
        comp: cardsData.compMap['newUsers'] || { name: 'newUsers', labels: [], dataPoints: [] },
    };
    const sessions = {
        curr: cardsData.currMap['sessions'] || { name: 'sessions', labels: [], dataPoints: [] },
        comp: cardsData.compMap['sessions'] || { name: 'sessions', labels: [], dataPoints: [] },
    };
    const totalUsers = {
        curr: cardsData.currMap['totalUsers'] || { name: 'totalUsers', labels: [], dataPoints: [] },
        comp: cardsData.compMap['totalUsers'] || { name: 'totalUsers', labels: [], dataPoints: [] },
    };
      

    return (
        <div id="metrics">
            {/* Top Metrics */}
            <div id="cards">
                {/* New Users */}
                <div className="card">
                    <div className="metric-graph">
                        <div className="metric-icon">
                            <img className="metricIcon" alt="icon" />
                            <div className="metricName">New Users</div>
                        </div>
                        <div className="metric">
                           <LineChart chartData={newUsers} isLoading={!cardsData.currMap['newUsers']} />
                        </div>
                    </div>
                </div>

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

                {/* Device Usage */}
                <div className="card">
                    <div className="metric-graph">
                        <div className="metric-icon">
                            <img className="metricIcon" alt="icon" />
                            <div className="metricName">Total Users</div>
                        </div>
                        <div className="metric">
                            <LineChart chartData={totalUsers} isLoading={!cardsData.currMap['totalUsers']} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Device and Browser Breakdown */}
            <div id="big-chart">
                <div id="chart">Device and Browser Breakdown</div>
                <table>
                    <thead>
                        <tr>
                            <th>Device</th>
                            <th>Browser</th>
                            <th>Views</th>
                            <th>Engagement Rate</th>
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
                {/* Geomap of Users by City */}
                <div id="map">
                  {/*}  {geoData ? (
                        <div>Geomap of Users by City</div>
                    ) : (
                        <div>No geomap data available.</div>
                    )} */}
                </div>

                {/* Pie Chart of Device Category Usage */}
                <div id="pie">
                   {/* {deviceCategoryData ? (
                        <div>Pie Chart of Device Category Usage</div>
                    ) : (
                        <div>No device category data available.</div>
                    )} */}
                </div>
            </div>
        </div>
    );
};

export default AudienceMetrics;
