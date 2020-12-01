import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const LineChart = ({
    title,
    xAxisCategories,
    yAxisName,
    seriesList,
    width,
    height,
}) => {
    const options = {
        chart: {
            type: 'line',
        },
        title: {
            text: title,
        },
        xAxis: {
            categories: xAxisCategories,
        },
        yAxis: {
            title: {
                text: yAxisName,
            },
        },
        plotOptions: {
            series: {
                color: '#7D5A5A',
            },
            line: {
                dataLabels: {
                    enabled: true,
                },
                enableMouseTracking: false,
            },
        },

        series: seriesList,
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

export default LineChart;
