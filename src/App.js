import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider, theme, Box, Flex } from '@chakra-ui/react';

import NavBar from './components/NavBar';
import CAP_Chart from './components/charts/CAP_Chart';
import Factors from './components/factors';
import Charts from './components/charts';
import Predictions from './components/predictions';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <NavBar />
        <Box margin="30px">
          <Routes>
            <Route path={`/charts/:name`} element={<CAP_Chart />} />
            <Route path={`/charts`} element={<Charts />} />
            <Route path="/factors" element={<Factors />} />
            <Route path="/predictions" element={<Predictions />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
