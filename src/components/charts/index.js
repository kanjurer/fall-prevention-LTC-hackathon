import { Link } from 'react-router-dom';
import { Box, Flex, StatNumber, Stat } from '@chakra-ui/react';
import { consideredKeys, taggingKeys } from '../../api/generateData';

import './charts.css';

export default function Charts() {
  return (
    <Flex flexDirection="row" wrap="wrap" justifyContent="space-evenly">
      {consideredKeys.map((e, i) => (
        <Link key={i} to={`/charts/${e}`}>
          <Box className="card">
            <Stat>
              <StatNumber>{taggingKeys(e)}</StatNumber>
            </Stat>
          </Box>
        </Link>
      ))}
    </Flex>
  );
}
