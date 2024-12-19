import React from 'react';

const AdsMetrics = ({ data }) => {
    if (!data) {
        return <div>No data available for the ads tab.</div>;
    }

    const { impressions, clicks, cost, adCampaignData, geoData, keyEventsData } = data;

    return (
        <div id="metrics">
            {/* Top Metrics */}
            <div id="cards">
                {/* Impressions */}
                <div className="card">
                    <div className="metric-graph">
                        <div className="metric-icon">
                            <img className="metricIcon" alt="icon" />
                            <div className="metricName">Impressions</div>
                        </div>
                        <div className="metric">
                            <span>{impressions}</span>
                        </div>
                    </div>
                </div>

                {/* Clicks */}
                <div className="card">
                    <div className="metric-graph">
                        <div className="metric-icon">
                            <img className="metricIcon" alt="icon" />
                            <div className="metricName">Clicks</div>
                        </div>
                        <div className="metric">
                            <span>{clicks}</span>
                        </div>
                    </div>
                </div>

                {/* Cost */}
                <div className="card">
                    <div className="metric-graph">
                        <div className="metric-icon">
                            <img className="metricIcon" alt="icon" />
                            <div className="metricName">Cost</div>
                        </div>
                        <div className="metric">
                            <span>{cost}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ad Campaign Performance */}
            <div id="big-chart">
                <div id="chart">Ad Campaign Performance</div>
                {/* Render your table using adCampaignData */}
            </div>

            {/* Geomap and Pie Chart */}
            <div id="map-pie">
                {/* Geomap of User Quality by Region */}
                <div id="map">
                    {geoData ? (
                        <div>Geomap of User Quality by Region</div>
                    ) : (
                        <div>No geographic data available.</div>
                    )}
                </div>

                {/* Pie Chart of Key Events from Ad Visitors */}
                <div id="pie">
                    {keyEventsData ? (
                        <div>Pie Chart of Key Events from Ad Visitors</div>
                    ) : (
                        <div>No key events data available.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdsMetrics;
