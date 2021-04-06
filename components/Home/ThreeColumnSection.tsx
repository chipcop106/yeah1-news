import {
  Box,
  Container,
  Divider,
  Stack,
  useBreakpointValue,
  useColorMode,
  useMediaQuery,
} from '@chakra-ui/react';
import CategoryTitle from '../widgets/CategoryTitle';
import { GiBlackBook } from 'react-icons/gi';
import { CategoryPost } from '@/components/widgets';
import { IoIosPeople } from 'react-icons/io';
import { IoMusicalNotesOutline } from 'react-icons/io5';

const ThreeColumnSection = ({ bookPosts, lifePosts, techPosts }) => {
  const { colorMode } = useColorMode();
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
  return (
    <Container maxW="1170px" as={`section`}>
      <Stack direction={{ base: 'column', md: 'row' }} spacing={8}>
        <Box position={`relative`} flex={1}>
          <Box mb={8}>
            <CategoryTitle
              title={`Book`}
              icon={
                <GiBlackBook
                  fontSize={`2rem`}
                  color={colorMode === 'light' ? '#000' : '#c9c9c9'}
                />
              }
              headingProps={{
                as: `h2`,
                size: `lg`,
                fontWeight: `light`,
              }}
            />
            <CategoryPost posts={bookPosts} limit={5} loading={false} />
          </Box>
          {!isLargerThan768 && <Divider mt={8} />}
        </Box>
        <Box position={`relative`} flex={1}>
          <Box mb={8}>
            <CategoryTitle
              title={`Đời sống`}
              icon={
                <IoIosPeople
                  fontSize={`2rem`}
                  color={colorMode === 'light' ? '#000' : '#c9c9c9'}
                />
              }
              headingProps={{
                as: `h2`,
                size: `lg`,
                fontWeight: `light`,
              }}
            />
            <CategoryPost posts={lifePosts} limit={5} loading={false} />
          </Box>
          {!isLargerThan768 && <Divider mt={8} />}
        </Box>

        <Box position={`relative`} flex={1}>
          <Box mb={8}>
            <CategoryTitle
              title={`Công nghệ`}
              icon={
                <IoMusicalNotesOutline
                  fontSize={`2rem`}
                  color={colorMode === 'light' ? '#000' : '#c9c9c9'}
                />
              }
              headingProps={{
                as: `h2`,
                size: `lg`,
                fontWeight: `light`,
              }}
            />
            <CategoryPost posts={techPosts} limit={5} loading={false} />
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default ThreeColumnSection;
