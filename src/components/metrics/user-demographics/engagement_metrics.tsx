import React from 'react';
import { GaDataProps } from '../../../types/props/Props';

const EngagementMetrics: React.FC<GaDataProps> = ({ data }) => {
    if (!data) {
        return <div>No data available for the engagement tab.</div>;
    }

    const {
        averageSessionDuration,
        userEngagementDuration,
        engagementRate,
        pageEngagementData,
        geoData,
        deviceEngagementData,
    } = data;

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
                            <span>{averageSessionDuration}</span>
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
                            <span>{userEngagementDuration}</span>
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
                            <span>{engagementRate}%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Page Engagement Overview */}
            <div id="big-chart">
                <div id="chart">Page Engagement Overview</div>
                {/* Render your chart/table using pageEngagementData */}
            </div>

            {/* Geomap and Pie Chart */}
            <div id="map-pie">
                {/* Geomap User Engagement by Country */}
                <div id="map">
                    {geoData ? (
                        <div>Geomap User Engagement by Country</div>
                    ) : (
                        <div>No geographic data available.</div>
                    )}
                </div>

                {/* Pie Chart of Engagement Rate by Device */}
                <div id="pie">
                    {deviceEngagementData ? (
                        <div>Pie Chart of Engagement Rate by Device</div>
                    ) : (
                        <div>No device engagement data available.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EngagementMetrics;
