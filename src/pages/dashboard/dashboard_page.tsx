import './dashboard_page.css';
import OverviewMetrics from '../../components/metrics/website-summary/overview_metrics';
import EngagementMetrics from '../../components/metrics/user-demographics/engagement_metrics';
import AudienceMetrics from '../../components/metrics/audience/audience_metrics';
import BehaviourMetrics from '../../components/metrics/user-behavior/behaviour_metrics';
import TimeLocationMetrics from '../../components/metrics/time-and-location/time_location_metrics';
import PageTrafficMetrics from '../../components/metrics/page-performance/page_performance_metrics';
import AdsMetrics from '../../components/metrics/ads/ads_metrics';
import { useGaData } from '../../context/ga_data_context';
import { FormattedGaData } from '../../api/dtos/analytics_dtos';

function DashboardPage() {
    const {
        tabData,
        activeTab,
        setActiveTab,
        startPeriod,
        comparisonPeriod,
        error,
    } = useGaData();

    /**
     * HandleTabClick sets the active tab.
     * @param tabName the name of the tab to set as active
     */
    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
    };

    // Default to "overview" if no tab is selected
    // TODO: Application defaults to the 'overview' tab on refresh.
    // TODO: This needs to be fixed to remember the last active tab by using the dependency array in the useEffect hook.
    const defaultTab = activeTab ?? 'overview';

    // Get the current tab data from the context's cached data
    const currentTabData =
        tabData[defaultTab]?.[`${startPeriod?.startDate}-${startPeriod?.endDate}`]?.data;

    // Default structure for empty tab data
    const parsedReports: FormattedGaData = currentTabData || {
        cardsData: { currMap: {}, compMap: {} },
        tableData: {},
        geoData: {},
    };

    /**
     * RenderMetrics handles the rendering of the metrics component based on the active dashboard tab.
     * 
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
                <div id="name">Good evening, Will</div> {/* TODO: Make this dynamic */} 
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
                    { label: 'Ads', tab: 'ads' },
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
                    <div className="error">
                        {error instanceof Error
                            ? error.message
                            : typeof error === 'string'
                            ? error
                            : 'An unknown error occurred.'}
                    </div>
                ) : (
                    renderMetrics()
                )}
            </div>
        </div>
    );
}

export default DashboardPage;
