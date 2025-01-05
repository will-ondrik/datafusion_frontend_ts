import React, { useEffect } from 'react';
import fullpage from 'fullpage.js';
import 'fullpage.js/dist/fullpage.css';
import './report_template.css';

/**
 * TODO:
 * 1) Update params to accept data from API
 * 2) Inject data into the report
 *    - Company Name
 *    - Company Logo
 *    - Report Date
 *    - Summaries
 *    - Metrics and Charts
 */
const AnalyticsReport: React.FC = () => {
  useEffect(() => {
    const fullpageInstance = new fullpage('#fullpage', {
      autoScrolling: true,
      navigation: true,
      scrollBar: true,
      fitToSection: true,
    });

    return () => {
      fullpageInstance.destroy();
    };
  }, []);

  return (
    <div id="fullpage">
      {/* Title Page */}
      <div className="section" id="titlePage">
        <div id="companyInfo">
          <h1>Company Name</h1>
          <img src="images/logo.png" alt="Company Logo" />
        </div>
        <div id="reportInfo">
          <h2>Company Name July 2024 Analytics Report</h2>
          <p>Report Date</p>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="section" id="tableOfContents">
        <h2>Table of Contents</h2>
        <div className="tocEntry">
          <div className="tocHeader">
            <h3>Executive Summary</h3>
            <p>Page 1</p>
          </div>
          <div className="tocLine"></div>
        </div>
        <div className="tocEntry">
          <div className="tocHeader">
            <h3>Engagement Metrics</h3>
            <p>Page 2</p>
          </div>
          <div className="tocLine"></div>
        </div>
        <div className="tocEntry">
          <div className="tocHeader">
            <h3>User Demographics</h3>
            <p>Page 3</p>
          </div>
          <div className="tocLine"></div>
        </div>
        <div className="tocEntry">
          <div className="tocHeader">
            <h3>User Behaviour</h3>
            <p>Page 4</p>
          </div>
          <div className="tocLine"></div>
        </div>
        <div className="tocEntry">
          <div className="tocHeader">
            <h3>Time and Region Insights</h3>
            <p>Page 5</p>
          </div>
          <div className="tocLine"></div>
        </div>
        <div className="tocEntry">
          <div className="tocHeader">
            <h3>Web Page Performance</h3>
            <p>Page 6</p>
          </div>
          <div className="tocLine"></div>
        </div>
        <div className="tocEntry">
          <div className="tocHeader">
            <h3>Recommendations</h3>
            <p>Page 7</p>
          </div>
          <div className="tocLine"></div>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="section" id="executiveSummary">
        <h2>Executive Summary</h2>
        <p>Content for the Executive Summary goes here.</p>
      </div>

      {/* Engagement Metrics */}
      <div className="section" id="engagementMetrics">
        <h2>Engagement Metrics</h2>
        <p>Content for Engagement Metrics goes here.</p>
      </div>

      {/* User Demographics */}
      <div className="section" id="userDemographics">
        <h2>User Demographics</h2>
        <p>Content for User Demographics goes here.</p>
      </div>

      {/* User Behaviour */}
      <div className="section" id="userBehaviour">
        <h2>User Behaviour</h2>
        <p>Content for User Behaviour goes here.</p>
      </div>

      {/* Time and Region Insights */}
      <div className="section" id="timeAndRegion">
        <h2>Time and Region Insights</h2>
        <p>Content for Time and Region Insights goes here.</p>
      </div>

      {/* Web Page Performance */}
      <div className="section" id="pagePerformance">
        <h2>Web Page Performance</h2>
        <p>Content for Web Page Performance goes here.</p>
      </div>

      {/* Recommendations */}
      <div className="section" id="recommendations">
        <h2>Recommendations</h2>
        <p>Content for Recommendations goes here.</p>
      </div>
    </div>
  );
};

export default AnalyticsReport;
