import React from 'react';
import { GaDataProps } from '../../../types/props/Props';

const PageTrafficMetrics: React.FC<GaDataProps> = ({ data }) => {
    if (!data) {
        return <div>No data available for the page traffic tab.</div>;
    }
    

    const { sessions, pageViews, bounceRate, pagePerformanceData, geoData, trafficSourceData } = data;

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
                            <span>{sessions}</span>
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
            </div>

            {/* Page Performance Analysis */}
            <div id="big-chart">
                <div id="chart">Page Performance Analysis</div>
                {/* Render your table using pagePerformanceData */}
            </div>

            {/* Geomap and Pie Chart */}
            <div id="map-pie">
                {/* Geomap of Page Traffic by Region */}
                <div id="map">
                    {geoData ? (
                        <div>Geomap of Page Traffic by Region</div>
                    ) : (
                        <div>No geographic data available.</div>
                    )}
                </div>

                {/* Pie Chart of Page Traffic Sources */}
                <div id="pie">
                    {trafficSourceData ? (
                        <div>Pie Chart of Page Traffic Sources</div>
                    ) : (
                        <div>No traffic source data available.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PageTrafficMetrics;
