import './dashboard_page.css';
import OverviewMetrics from '../../components/metrics/website-summary/overview_metrics';
import EngagementMetrics from '../../components/metrics/user-demographics/engagement_metrics';
import AudienceMetrics from '../../components/metrics/audience/audience_metrics';
import BehaviourMetrics from '../../components/metrics/user-behavior/behaviour_metrics';
import TimeLocationMetrics from '../../components/metrics/time-and-location/time_location_metrics';
import PageTrafficMetrics from '../../components/metrics/page-performance/page_performance_metrics';
import AdsMetrics from '../../components/metrics/ads/ads_metrics';
import { useGaData } from '../../context/ga_data_context';
import { GaReport, GaReportsResponse } from '../../api/dtos/analytics_dtos';
import { sortMetricsForCharts } from '../../utils/utils';

function DashboardPage() {
    const {
        tabData,
        activeTab,
        setActiveTab,
        startPeriod,
        setStartPeriod,
        comparisonPeriod,
        setComparisonPeriod,
        isLoading,
        error,
    } = useGaData();

    // Parse batch reports 
    // Returns an array of current and comparison period data
    /**
     * This function takes in an array of batch reports and returns an array of current and comparison period data.
     * 
     * @param batchReportsArr 
     * @returns an array of current and comparison period data
     */
    const parseDashboardData = (batchReportsArr: GaReportsResponse): GaReportsResponse => {
        console.log('batch reports', batchReportsArr);
        if (!Array.isArray(batchReportsArr) || batchReportsArr.length === 0) {
            throw new Error("Invalid or empty batch reports array.");
        }
        
        // Extract the current and comparison period data
        const CurrPeriod = batchReportsArr[0].currPeriod;
        const CompPeriod = batchReportsArr[0].compPeriod;
        console.log('Comp Oeriod', CompPeriod);
    
        const currPeriod: GaReport = {
            metricTotals: CurrPeriod?.metricTotals || {},
            data: CurrPeriod?.reports || [],
        };
    
        const compPeriod: GaReport = {
            metricTotals: CompPeriod?.metricTotals || {},
            data: CompPeriod?.reports || [],
        };
    
        return {
            currPeriod,
            compPeriod,
        };
    };
    
    
    /**
     * HandleTabClick sets the active tab.
     * @param tabName the name of the tab to set as active
     */
    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
    };

    // Current tab's data
    const defaultTab = activeTab ?? 'overview';
    const currentTabData = tabData[defaultTab]?.[`${startPeriod?.startDate}-${startPeriod?.endDate}`]?.data;
    const parsedReports: GaReportsResponse = currentTabData ? parseDashboardData(currentTabData) : 
                                                            { currPeriod: { metricTotals: {}, data: [] }, 
                                                              compPeriod: { metricTotals: {}, data: [] } };

    console.log('parsed reports', parsedReports);
    
    /**
     * RenderMetrics handles the rendering of the metrics component based on the active dashboard tab.
     * @returns the metrics component based on the active tab
     */
    const renderMetrics = () => {
        switch (activeTab) {
            case 'overview':
                return <OverviewMetrics data={parsedReports} />;
            case 'engagement':
                return <EngagementMetrics data={parsedReports} />;
            case 'audience':
                return <AudienceMetrics data={parsedReports} />;
            case 'behaviour':
                return <BehaviourMetrics data={parsedReports} />;
            case 'time-location':
                return <TimeLocationMetrics data={parsedReports} />;
            case 'page-traffic':
                return <PageTrafficMetrics data={parsedReports} />;
            case 'ads':
                return <AdsMetrics data={parsedReports} />;
            default:
                return <div>No data available for this tab.</div>;
        }
    };

    return (
        <div id="container">
            {/* Header */}
            <div id="name-date">
                <div id="name">Good evening, Will</div>
                <div id="date-range">
                    {startPeriod && comparisonPeriod ? (
                        <>
                            {startPeriod.startDate} - {startPeriod.endDate}
                        </>
                    ) : (
                        'Loading dates...'
                    )}
                </div>
            </div>

            {/* Tabs */}
            <div id="tabs">
                {[
                    { label: 'Website Summary', tab: 'overview' },
                    { label: 'User Engagement', tab: 'engagement' },
                    { label: 'User Demographics', tab: 'audience' },
                    { label: 'User Behavior', tab: 'behaviour' },
                    { label: 'Time and Region Insights', tab: 'time-location' },
                    { label: 'Page Performance', tab: 'page-traffic' },
                    { label: 'Ads', tab: 'ads'}
                ].map(({ label, tab }) => (
                    <button
                        key={tab}
                        className={`tab ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => handleTabClick(tab)}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Metrics Section */}
            <div id="metrics">
                 {error ? (
            <div className="error">{error.toString()}</div>
            ) : (
            renderMetrics()
    )}
</div>

        </div>
    );
}

export default DashboardPage;
