import React from 'react';
import './overview_metrics.css'
import { useGaData } from '../../../context/ga_data_context';
import { GaDataProps } from '../../../types/props/Props';

const OverviewMetrics: React.FC<GaDataProps> = ({ data }) => {
    const { startPeriod, comparisonPeriod } = useGaData();
    console.log(startPeriod, comparisonPeriod)
    if (!data) {
        return <div>No data available for the overview tab.</div>;
    }

   
    
    //const [ topMetrics, chartData, geoData, pieData ] = data[0].Sections;
    //const [ prevTopMetrics, prevChartData, prevGeoData, prevPieData ] = data[1].Sections;


   
    return (
        <div>work?</div>
    )
};

export default OverviewMetrics;
