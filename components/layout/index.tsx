import { Box, Container } from '@chakra-ui/react';
import Header from './Header';
import Footer from './Footer';

import { useColorMode } from '@chakra-ui/react';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Box as={`main`} py={8}>
        {children}
      </Box>
      <Footer />
    </>
  );
}
