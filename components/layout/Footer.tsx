import { Box, Container, useColorMode, Text, HStack } from '@chakra-ui/react';

const Footer = () => {
  const { colorMode } = useColorMode();
  return (
    <Box as={`footer`}>
      <Container maxW="1170px">
        <Box
          borderTop={`1px`}
          borderTopColor={colorMode === 'light' ? `gray.100` : `gray.700`}
          borderTopStyle={`solid`}
          py={4}
        >
          <HStack
            direction={['column', 'row']}
            justifyContent={`space-between`}
            spacing={4}
          >
            <Text fontSize={`sm`}>© Copyright - Developer</Text>
            <HStack direction={['column', 'row']} spacing={4} fontSize={`sm`}>
              <Text>Policy</Text>
              <Text>Contact</Text>
              <Text>Support</Text>
            </HStack>
          </HStack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
