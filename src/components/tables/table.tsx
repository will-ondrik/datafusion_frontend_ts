import React from 'react';
import { ChartMap } from '../../api/dtos/analytics_dtos';

const DataTable: React.FC<{ data: ChartMap }> = ({ data }) => {
	if (!data) {
		return <div>Loading...</div>;
	}
	
  return (
	<tbody>
		{Object.entries(data).map(([dimensionName, record]) => (
		<tr key={dimensionName}>
			<td>{dimensionName}</td>
			<td>{record.engagementRate}</td>
			<td>{record.numViews}</td>
			<td>{record.numSessions}</td>
			<td>{record.numUsers}</td>
		</tr>
		))}
  	</tbody>
  );
}

export default DataTable;
