import { GaDataProps } from "../../../types/props/Props";

const AudienceMetrics: React.FC<GaDataProps> = ({ data }) => {
    if (!data) {
        return <div>No data available for the audience tab.</div>;
    }

    const { currPeriod, compPeriod } = data;
    console.log('currPeriodData', currPeriod);
    console.log('prevPeriodData', compPeriod);

    //const { newUsers, sessions, deviceUsage, deviceAndBrowserData, geoData, deviceCategoryData } = data;


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
                           {/*} <span>{newUsers}</span> */}
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
                           {/* <span>{sessions}</span> */}
                        </div>
                    </div>
                </div>

                {/* Device Usage */}
                <div className="card">
                    <div className="metric-graph">
                        <div className="metric-icon">
                            <img className="metricIcon" alt="icon" />
                            <div className="metricName">Device Usage</div>
                        </div>
                        <div className="metric">
                          {/*  <span>{deviceUsage}</span> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Device and Browser Breakdown */}
            <div id="big-chart">
                <div id="chart">Device and Browser Breakdown</div>
                {/* Render your table or chart using deviceAndBrowserData */}
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
