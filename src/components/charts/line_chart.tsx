import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { CardData } from '../../api/dtos/analytics_dtos';
import Spinner from '../animations/spinner/spinner';

// Register necessary Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const LineChart: React.FC<{ chartData: CardData; isLoading: boolean }> = ({ chartData, isLoading }) => {

    if (isLoading) {
        return <Spinner />;
    }

    // Handle missing data
    if (!chartData.curr || !chartData.comp) {
        return <div>No data available to display.</div>;
    }

    const lineChartData = {
        labels: chartData.curr.labels,
        datasets: [
            {
                label: `${chartData.curr.name}`,
                data: chartData.curr.dataPoints,
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
            {
                label: `${chartData.comp.name}`,
                data: chartData.comp.dataPoints,
                fill: false,
                backgroundColor: 'rgb(111, 99, 132)',
                borderColor: 'rgba(111, 99, 132, 0.2)',
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: '',
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: '',
                },
            },
        },
    };

    return <Line data={lineChartData} options={options} />;
};

export default LineChart;
