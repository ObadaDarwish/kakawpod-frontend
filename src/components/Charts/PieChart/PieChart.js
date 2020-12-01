import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const PieChart = ({ title, width, height }) => {
    const options = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            chartHeight: 300,
            chartWidth: 300,
            plotHeight: 200,
            type: 'pie',
        },
        title: {
            text: title,
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
        },
        accessibility: {
            point: {
                valueSuffix: '%',
            },
        },

        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                size: '70%',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                },
            },
        },
        series: [
            {
                name: 'Orders',
                colorByPoint: true,
                data: [
                    {
                        name: 'Online',
                        y: 60,
                        color: '#F1D1D1',
                    },
                    {
                        name: 'Shop',
                        y: 40,
                        color: '#f3e1e1',
                    },
                ],
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

export default PieChart;
