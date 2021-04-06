import {
  Box,
  Container,
  Divider,
  Image,
  Stack,
  useBreakpointValue,
  useColorMode,
  useMediaQuery,
} from '@chakra-ui/react';
import CategoryTitle from '../widgets/CategoryTitle';
import { FaBasketballBall } from 'react-icons/fa';
import { socialPosts, sportPosts } from '../../data-sample';
import { HorizontalCard } from '@/components/BlogCard';
import { vnSlugGenerator } from '../../helpers/utils';
import { MdOndemandVideo } from 'react-icons/md';

const SportSection = ({ sportPosts, sportVideos }) => {
  const { colorMode } = useColorMode();
  const headingSizes = useBreakpointValue({
    base: 'sm',
    sm: 'sm',
    md: 'md',
  });
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

  return (
    <Container maxW="1170px" as={`section`} mb={8}>
      <Stack direction={{ base: 'column', md: 'row' }} spacing={8}>
        <Box flexGrow={1}>
          <CategoryTitle
            title={`Thể thao`}
            icon={
              <FaBasketballBall
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
          {sportPosts.map((post, index) =>
            index === sportPosts.length - 1 ? (
              <Box key={`${index}`}>
                <HorizontalCard
                  post={post}
                  showCategory={true}
                  headingProps={{
                    size: headingSizes,
                    as: `h3`,
                  }}
                />
              </Box>
            ) : (
              <Box mb={8} key={`${index}`}>
                <HorizontalCard
                  post={post}
                  showCategory={true}
                  headingProps={{
                    size: headingSizes,
                    as: `h3`,
                  }}
                />
              </Box>
            )
          )}
        </Box>
        {!isLargerThan768 && <Divider mt={8} />}
        <Box
          w={{ lg: 350, base: `100%` }}
          flexShrink={{ lg: 0, base: 1 }}
          position={`relative`}
        >
          <Box mb={8}>
            <CategoryTitle
              title={`Video bóng đá`}
              icon={
                <MdOndemandVideo
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
            {sportVideos.map((post, index) => (
              <Box mb={8} key={`${index}`}>
                <HorizontalCard
                  post={post}
                  showCategory={true}
                  showDescription={false}
                  headingProps={{
                    as: `h3`,
                    size: `sm`,
                  }}
                  spacing={4}
                  type={'video'}
                />
              </Box>
            ))}
          </Box>
          <Box pos={`sticky`} top={16}>
            <Image
              src={`https://via.placeholder.com/300x300/f9f9f9/?text=300x300+Advertiser`}
              width={`100%`}
            />
          </Box>
        </Box>
      </Stack>
      <Divider mt={8} />
    </Container>
  );
};

export default SportSection;
