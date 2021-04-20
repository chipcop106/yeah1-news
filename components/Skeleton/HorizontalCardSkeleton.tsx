import { Box, Text, HStack, Tag } from '@chakra-ui/react';

import Skeleton from 'react-loading-skeleton';

const HorizontalCard = () => {
  return (
    <HStack
      spacing={{
        xl: 4,
        md: 4,
        sm: 4,
        base: 4,
      }}
      alignItems={`flex-start`}
    >
      <Box pos={`relative`} w={`30%`} flexShrink={0}>
        <Skeleton width={`100%`} height={75} />
      </Box>
      <Box flexGrow={1}>
        <Skeleton />
        <HStack spacing={2} alignItems={`center`}>
          <Skeleton width={100} />
          <Text color={`gray.500`} fontSize={`sm`}>
            <Skeleton />
          </Text>
        </HStack>
        <Text
          color={`gray.500`}
          display={{ base: `none`, md: `block` }}
          fontSize={`sm`}
          noOfLines={2}
          data-testid="description"
        >
          <Skeleton count={3} />
        </Text>
      </Box>
    </HStack>
  );
};

export default HorizontalCard;
