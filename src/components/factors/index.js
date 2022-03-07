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
} from '@chakra-ui/react';
import { strongCorrFallAndOthers, taggingKeys } from '../../api/generateData';

export default function Factors() {
  const vals = strongCorrFallAndOthers();

  return (
    <Box>
      <Heading size="2xl">Factors affecting falls</Heading>
      <br /> <br />
      <img src="correlation.png" style={{ float: 'right' }} />
      <Heading size="md">
        Factors which are directly proportionate to fall:
      </Heading>
      <List spacing={2}>
        {Object.keys(vals)
          .sort((first, second) => -vals[first] + vals[second])
          .map((e, i) =>
            vals[e] > 0.06 ? (
              <ListItem key={i}>{taggingKeys(e)}</ListItem>
            ) : null
          )}
      </List>
      <br />
      <Heading size="md">
        Factors which are inversely proportionate to fall:
      </Heading>
      <List spacing={2}>
        {Object.keys(vals)
          .sort((first, second) => -vals[first] + vals[second])
          .map((e, i) =>
            vals[e] < -0.05 ? (
              <ListItem key={i}>{taggingKeys(e)}</ListItem>
            ) : null
          )}
      </List>
      <br /> <br />
      <Table variant="simple">
        <TableCaption>Table: Factors affecting Fall Rate </TableCaption>
        <Thead>
          <Tr>
            <Th>Factor</Th>
            <Th>Coorelation</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.keys(vals)
            .sort((first, second) => vals[first] - vals[second])
            .map((e, i) => (
              <Tr key={i}>
                <Td>{taggingKeys(e)}</Td>
                <Td>{vals[e]}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  );
}
