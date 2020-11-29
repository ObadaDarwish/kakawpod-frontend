import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const BarChart = ({ title, dataList, yAxisName, width, height }) => {
    const options = {
        chart: {
            type: 'column',
        },
        title: {
            text: title,
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif',
                },
            },
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Inventory (KG)',
            },
        },
        legend: {
            enabled: false,
        },
        tooltip: {
            pointFormat: 'Inventory: <b>{point.y:.1f} KGs</b>',
        },
        series: [
            {
                name: 'Inventory',
                data: dataList,
                dataLabels: {
                    enabled: true,
                    rotation: -90,
                    color: '#FFFFFF',
                    align: 'right',
                    format: '{point.y:.0f}', // one decimal
                    y: 10, // 10 pixels down from the top
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif',
                    },
                },
            },
        ],
    };
    return (
        <div style={{ width: width, height: height }}>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                containerProps={{ className: 'chartContainer' }}
            />
        </div>
    );
};

export default BarChart;
