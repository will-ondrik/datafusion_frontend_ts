import React from 'react';
import { GaDataProps } from '../../../types/props/Props';

const TimeLocationMetrics: React.FC<GaDataProps> = ({ data }) => {
    if (!data) {
        return <div>No data available for the time and location tab.</div>;
    }

    //const { sessionsByHour, pageViewsByDay, usersByRegion, timeTrendsData, geoData, sessionByHourData } = data;

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
                          {/*  <span>{sessionsByHour}</span> */}
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
                           {/* <span>{pageViewsByDay}</span> */}
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
                          {/*  <span>{usersByRegion}</span> */}
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
