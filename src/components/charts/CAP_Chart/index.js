import { Flex, Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import { getGroupedCAP_Data } from '../../../api/generateData';
import CanvasJSReact from '../../../assets/canvasjs.react';
import { useParams } from 'react-router-dom';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function CAP_Chart() {
  let { name } = useParams();
  const groupedData = getGroupedCAP_Data(name);

  const options = {
    animationEnabled: true,
    theme: 'light2',
    title: {
      text: name,
    },
    axisX: {
      title: 'Codes',
    },
    axisY: {
      title: '# of people',
    },
    data: [
      {
        type: 'column',
        dataPoints: groupedData.categories,
      },
    ],
  };

  return (
    <Flex marginTop={10} justifyContent="space-between">
      <CanvasJSChart
        options={options}
        /* onRef={ref => this.chart = ref} */
      />

      <Flex wrap="wrap" flexDirection="column" justifyContent="space-between">
        <Stat>
          <StatLabel>Mean</StatLabel>
          <StatNumber>{Math.round(groupedData.mean * 100) / 100}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Sample Variance</StatLabel>
          <StatNumber>
            {Math.round(groupedData.sampleVariance * 100) / 100}
          </StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Standard Deviation</StatLabel>
          <StatNumber>
            {Math.round(groupedData.standardDeviation * 100) / 100}
          </StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Median</StatLabel>
          <StatNumber>{Math.round(groupedData.median * 100) / 100}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Mode</StatLabel>
          <StatNumber>{Math.round(groupedData.mode * 100) / 100}</StatNumber>
        </Stat>
      </Flex>
    </Flex>
  );
}
