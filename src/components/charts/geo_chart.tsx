import React from "react";
import { Chart } from "react-google-charts";
import { GeoMap } from "../../api/dtos/analytics_dtos";
import { Legend } from "chart.js";
import Spinner from "../animations/spinner/spinner";

export const GeoChart: React.FC<{ data: GeoMap}> = ({ data }) => {
  console.log("GeoChart data:", data);
  if (!data) {
    return <Spinner />;
  }
  

  const geoData = [
    ["Country", "Sessions"],
    ...Object.values(data).map(({ country, sessions}: any) => [country, sessions])
  ]
  console.log("GeoData:", geoData);


  const options = {
    backgroundColor: "#242424", 
    datalessRegionColor: "#333333", // Color for regions without data
    defaultColor: "#666666", // Default region color
    colorAxis: { colors: ["#e7f2fa", "#fdc57b", "#ff6f00"] }, // Data gradient
    legend: "none", 
  };

  return (
    <div>
      <Chart
        chartType="GeoChart"
        data={geoData}
        options={options}
        width="100%"
        height="250px"
      />
    </div>
  );
};

export default GeoChart;
