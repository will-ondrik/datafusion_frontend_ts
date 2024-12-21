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

  export const LineChart = ({ name, labels, dataPoints }: LineChartProps) => {
    // ChartJS
    const lineChartData = {
        labels: labels,
        datasets: [{
            label: name,
            data: dataPoints,
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
        }]
    };
    return (
        <Line data={lineChartData} />
    )
  }