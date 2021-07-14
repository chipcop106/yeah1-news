import { Box } from '@chakra-ui/react';

import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Box as={`main`} py={8}>
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
