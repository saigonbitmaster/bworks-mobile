import React from 'react';
import { Box } from 'native-base';

const LoadingView = ({ text = 'Loading...' }) => {
  return (
    <Box flex={1} justifyContent={'center'}>
      <Box
        alignSelf="center" // bg="primary.500"
        pb="4"
        _text={{
          fontSize: '2xl',
          colorScheme: 'primary',
          color: 'black',
          letterSpacing: 'lg',
        }}
      >
        {text}
      </Box>
    </Box>
  );
};

export default LoadingView;
