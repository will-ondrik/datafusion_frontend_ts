import React from 'react';

const DataTable: React.FC<{ data: any }> = ({ data }) => {
    return (
        <>
            {Object.entries(data).map(([dimensionValue, record]: [string, any]) => (
                <tr key={dimensionValue}>
                    <td>{dimensionValue}</td>
                    {Object.values(record.metric).map((metricValue, index) => (
                        <td key={index}>{String(metricValue) || '-'}</td>
                    ))}
                </tr>
            ))}
        </>
    );
};

export default DataTable;
