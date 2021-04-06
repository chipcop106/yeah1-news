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
import {GET_CONTENT_CATEGORY} from "../../services/GraphSchema";
import { useQuery } from '@apollo/client';
import {formatUnixDate} from "../../helpers/utils";

const SocialSection = () => {
  const { colorMode } = useColorMode();
  const headingSizes = useBreakpointValue({
    base: 'sm',
    sm: 'sm',
    md: 'md',
  });

  const { loading, error, data } = useQuery(GET_CONTENT_CATEGORY, {
    variables: {
      where: {
        categoryId: '60629fc0f6a2c23fb4daec5f'
      },
      sort: "createAt:DESC",
      limit: 10
    }
  });
  if(loading) return <div>Loading...</div>

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
          {data.getLastedPost.map((post, index) =>
            index === data.getLastedPost.length - 1 ? (
              <Box key={`${index}`}>
                <HorizontalCard
                  post={{
                    id: post.id,
                    title: post.title,
                    imageUrl: post?.extra_info?.image ?? post.images[0].src,
                    category: 'Xã hội',
                    description: post.description || post.extra_info.dek,
                    publishDate: formatUnixDate(post.extra_info.date_published / 1000),
                    slug: post.slug
                  }}
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
                  post={{
                    id: post.id,
                    title: post.title,
                    imageUrl: post?.extra_info?.image ?? post.images[0].src,
                    category: 'Xã hội',
                    description: post.description || post.extra_info.dek,
                    publishDate: formatUnixDate(post.extra_info.date_published / 1000),
                    slug: post.slug
                  }}
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
