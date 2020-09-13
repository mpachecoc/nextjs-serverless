import React from 'react';
import { Divider as ChakraDevider, Grid } from '@chakra-ui/core';

const Divider: React.FC = () => {
  return (
    <Grid
      gridTemplateColumns="1fr 1fr"
      columnGap={12}
      opacity={0.4}
    >
      <ChakraDevider marginY={6} />
      <ChakraDevider marginY={6} />
    </Grid>
  );
}

export default Divider;