import React, { Component } from 'react';
import { generateRegressionData } from '../../../api/generateData';
import CanvasJSReact from '../../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function RegressionChart() {
  const options = {
    animationEnabled: true,
    zoomEnabled: true,
    title: {
      text: 'Ice Cream Sales vs Temperature',
    },
    axisX: {
      title: 'CAP_1',
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
      },
    },
    axisY: {
      title: 'CAP_2',
      includeZero: false,
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
      },
    },
    data: [
      {
        type: 'scatter',
        markerSize: 30,
        toolTipContent: '<b>Temperature: </b>{x}°C<br/><b>Sales: </b>{y}',
        dataPoints: generateRegressionData('CAP_Falls', 'CAP_Activities'),
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart
        options={options}
        /* onRef={ref => this.chart = ref} */
      />
    </div>
  );
}
