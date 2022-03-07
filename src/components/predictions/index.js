import {
  Box,
  Table,
  TableCaption,
  Th,
  Tr,
  Thead,
  Td,
  Tbody,
  Heading,
  List,
  ListItem,
  Text,
  MenuButton,
  Button,
  Menu,
  MenuList,
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Flex,
  Badge,
  Tooltip,
} from '@chakra-ui/react';

import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  consideredKeys,
  linRegAndOthers,
  taggingKeys,
} from '../../api/generateData';
import RegressionChart from '../charts/Regression_Chart';
import { useState } from 'react';

export default function Predictions() {
  const [sliderValue, setSliderValue] = useState(0.21);
  const [vals, setVals] = useState(linRegAndOthers());

  return (
    <Box>
      <img src="granny.jpg" style={{ float: 'right' }} />
      <Heading fontFamily="cursive" size="2xl">
        Hi! I am the Oracle, and I predict the future!
      </Heading>
      <Text fontFamily="cursive">
        I use techniques like Linear Regression to predict the future
      </Text>
      <br />
      <br />
      <Box>
        <Text size="lg">
          Just slide this to see what other parameters would look like
        </Text>
        <Slider
          width="80%"
          value={sliderValue}
          defaultValue={60}
          min={0}
          max={1}
          step={0.04}
          onChange={val => {
            setSliderValue(val);
          }}
        >
          <SliderTrack bg="red.100">
            <Box position="relative" right={10} />
            <SliderFilledTrack bg="tomato" />
          </SliderTrack>
          <Tooltip label={`Fall: ${sliderValue}`}>
            <SliderThumb boxSize={6} />
          </Tooltip>
        </Slider>
        <br />
      </Box>
      <Flex wrap="wrap" justifyContent="space-around">
        {Object.keys(vals)
          .sort(
            (f, s) =>
              -Math.abs(
                Math.round((sliderValue * vals[f].m + vals[f].b) * 100) / 100
              ) +
              Math.abs(
                Math.round((sliderValue * vals[s].m + vals[s].b) * 100) / 100
              )
          )
          .map((e, i) => {
            if ((Number.isNaN(vals[e].m), Number.isNaN(vals[e].b))) return;
            return (
              <Badge key={i} margin={2} colorScheme={randomBadgeColor()}>
                <Stat key={i} style={{ margin: '10px', width: '200px' }}>
                  <Text>{taggingKeys(e)}</Text>
                  <StatNumber>
                    {Math.round((sliderValue * vals[e].m + vals[e].b) * 1000) /
                      1000}
                  </StatNumber>
                </Stat>
              </Badge>
            );
          })}
      </Flex>
      <br />
      <br />
    </Box>
  );
}

function randomBadgeColor() {
  const colors = [
    'whiteAlpha',
    'gray',
    'red',
    'orange',
    'yellow',
    'green',
    'teal',
    'blue',
    'cyan',
    'purple',
    'pink',
    'linkedin',
    'facebook',
    'messenger',
    'whatsapp',
    'twitter',
    'telegram',
    'blackAlpha',
  ];
  return colors[Math.random() * (colors.length - 1)];
}
