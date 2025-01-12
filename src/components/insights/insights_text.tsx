import PulseText from "../animations/pulse/pulse";

export interface InsightContent {
    percentageChange: string
    trend: string
}

const InsightsText: React.FC<{data: InsightContent}> = ({ data }) => {
    return (
        <div>
            <p><i>{data.percentageChange}</i></p>
            <p>Trend: {data.trend}</p>
        </div>
    );
}

export default InsightsText;