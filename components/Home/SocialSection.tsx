import {
  Box,
  Container,
  Divider,
  Image,
  Stack,
  useBreakpointValue,
  useColorMode,
} from '@chakra-ui/react';
import CategoryTitle from '../widgets/CategoryTitle';
import { IoPeopleOutline } from 'react-icons/io5';
import { HorizontalCard } from '@/components/BlogCard';
import { formatUnixDate } from '../../helpers/utils';
import dayjs from 'dayjs';

const SocialSection = ({ loading, data }) => {
  const { colorMode } = useColorMode();
  const headingSizes = useBreakpointValue({
    base: 'sm',
    sm: 'sm',
    md: 'md',
  });

  return (
    <Container maxW="1170px" as={`section`} mb={8}>
      <Stack direction={{ base: 'column', md: 'row' }} spacing={8}>
        <Box flexGrow={1}>
          <CategoryTitle
            title={`Xã hội`}
            icon={
              <IoPeopleOutline
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
          {loading ? (
            <div>Loading...</div>
          ) : (
            data.map((post, index) => (
              <Box mb={index === data.length - 1 ? 0 : 6} key={`${index}`}>
                <HorizontalCard
                  post={{
                    id: post.id,
                    title: post.title,
                    imageUrl: post?.extra_info?.image ?? post.images[0].src,
                    category: 'Xã hội',
                    description: post.description || post.extra_info.dek,
                    publishDate:
                      post.extra_info.date_published !== null
                        ? formatUnixDate(post.extra_info.date_published / 1000)
                        : dayjs(new Date(post.createdAt)).format('DD/MM/YYYY'),
                    slug: post.slug,
                  }}
                  showCategory={true}
                  headingProps={{
                    size: headingSizes,
                    as: `h3`,
                  }}
                />
              </Box>
            ))
          )}
        </Box>
        <Box
          w={{ lg: 350, base: `100%` }}
          flexShrink={{ lg: 0, sm: 1 }}
          position={`relative`}
        >
          <Box pos={`sticky`} top={16}>
            <Image
              src={`https://via.placeholder.com/300x600/f9f9f9/?text=300x600+Half+Page`}
              width={`100%`}
            />
          </Box>
        </Box>
      </Stack>
      <Divider mt={8} />
    </Container>
  );
};

export default SocialSection;
