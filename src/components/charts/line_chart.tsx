import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { LineChartProps } from '../../types/props/Props';
import { useGaData } from '../../context/ga_data_context';
import Spinner from '../animations/spinner/spinner';
  
  // Registering necessary Chart.js components
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  export const LineChart: React.FC<{chartData: LineChartProps, isLoading: boolean}> = ({ chartData, isLoading }) => {
    console.log('labels', chartData.currLabels);
    
    const lineChartData = {
        labels: chartData.currLabels,
        datasets: [
            {
                label: chartData.name,
                data: chartData.currDataPoints,
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
            {
                label: chartData.name,
                data: chartData.compDataPoints,
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
            }
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

    if (isLoading) {
        return <Spinner />;
    }
    return <Line data={lineChartData} options={options} />;
};

export default LineChart;