import { useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Stack,
  useBreakpointValue,
  useColorMode,
} from '@chakra-ui/react';
import VisuallyHidden from '@reach/visually-hidden';
import { HorizontalCard } from '@/components/BlogCard';
import CategoryTitle from '../widgets/CategoryTitle';
import { IoTimerOutline } from 'react-icons/io5';
import { useState } from 'react';
import {useQuery} from "@apollo/client";
import {ALL_CATEGORIES, GET_LASTED_POST} from "@/services/GraphSchema";
import {formatUnixDate} from "../../helpers/utils";

const LastedPostSection = () => {
  const { colorMode } = useColorMode();
  const [lastedPosts, setLastedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(3);
  const headingSizes = useBreakpointValue({
    base: 'sm',
    sm: 'sm',
    md: 'md',
  });
  const { data:catsData } = useQuery(ALL_CATEGORIES);
  const { loading:lastedLoading, error:LastedError, data:LastedData, fetchMore } = useQuery(GET_LASTED_POST, {
    variables: {
      sort: "createAt:DESC",
      limit: 4,
      start: offset,
    },
    onCompleted: (res) => setLastedPosts(lastedPosts.concat(res.getLastedPost)),
    fetchPolicy: "cache-and-network",
    partialRefetch: true
  });

  const loadmoreLastedPost = () => {
    fetchMore({
      variables: {
        sort: "createAt:DESC",
        limit: 4,
        start: offset + 4,
      },
    });
    setOffset(offset + 4);
  };

  return (
    <Container maxW="1170px" as={`section`} mb={8}>
      <VisuallyHidden>
        <h2>Bài viết mới</h2>
      </VisuallyHidden>
      <Stack direction={{ base: 'column', md: 'row' }} spacing={8}>
        <Box flexGrow={1}>
          {lastedPosts.map((post, index) => {
            const category = catsData.categories.find(cat => {
              const matches = cat.tags.filter(tag => tag.id === post.content_tags[0])
              return matches.length > 0;
            });
            return       index === lastedPosts.length - 1 ? (
                <Box key={`${index}`}>
                  <HorizontalCard
                      post={{
                        ...post,
                        imageUrl: post?.extra_info?.image ?? post.images[0].src,
                        category: category ? category.name : 'Khác'
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
                        ...post,
                        imageUrl: post?.extra_info?.image ?? post.images[0].src,
                        category: category ? category.name : 'Khác',
                        publishDate: formatUnixDate(post.extra_info.date_published / 1000),
                      }}
                      showCategory={true}
                      headingProps={{
                        size: headingSizes,
                        as: `h3`,
                      }}
                  />
                </Box>
            )
          }
          )}
          <Box align={`center`} mt={8}>
            <Button
              variant={`solid`}
              colorScheme={`gray`}
              onClick={loadmoreLastedPost}
              isLoading={lastedLoading}
              loadingText="Đang tải bài viết..."
            >
              Xem thêm bài viết mới
            </Button>
          </Box>
        </Box>
        <Box w={{ lg: 350, base: `100%` }} flexShrink={{ lg: 0, sm: 1 }}>
          <CategoryTitle
            title={`Trending now`}
            icon={
              <IoTimerOutline
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
          {lastedPosts.map((post, index) =>{
            const category = catsData.categories.find(cat => {
              const matches = cat.tags.filter(tag => tag.id === post.content_tags[0])
              return matches.length > 0;
            });
            return (
                <Box mb={8} key={`${index}`}>
                  <HorizontalCard
                      post={{
                        ...post,
                        imageUrl: post?.extra_info?.image ?? post.images[0].src,
                        category: category ? category.name : 'Khác',
                        publishDate: formatUnixDate(post.extra_info.date_published / 1000),

                      }}
                      showCategory={true}
                      showDescription={false}
                      headingProps={{
                        as: `h3`,
                        size: `sm`,
                      }}
                      spacing={4}
                  />
                </Box>
            )
          } )}
        </Box>
      </Stack>
    </Container>
  );
};

export default LastedPostSection;
