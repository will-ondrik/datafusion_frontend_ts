import React from 'react';
import { GaDataProps } from '../../../types/props/Props';

const BehaviourMetrics: React.FC<GaDataProps> = ({ data }) => {
    if (!data) {
        return <div>No data available for the behaviour tab.</div>;
    }

    const { pageViews, bounceRate, returningUsers, userFlowData, geoData, newVsReturningData } = data;

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
                            <span>{pageViews}</span>
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
                            <span>{bounceRate}%</span>
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
                            <span>{returningUsers}</span>
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
                    {geoData ? (
                        <div>Geomap of Bounce Rate by Region</div>
                    ) : (
                        <div>No geographic data available.</div>
                    )}
                </div>

                {/* Pie Chart of New vs Returning Users */}
                <div id="pie">
                    {newVsReturningData ? (
                        <div>Pie Chart of New vs Returning Users</div>
                    ) : (
                        <div>No new vs returning data available.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BehaviourMetrics;
