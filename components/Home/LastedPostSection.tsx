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
import { IoVideocamOutline } from 'react-icons/io5';
import { formatUnixDate } from '../../helpers/utils';
import dayjs from 'dayjs';
import HorizontalCardSkeleton from '@/components/Skeleton/HorizontalCardSkeleton';

const LastedPostSection = ({
  lastedPosts,
  lastedVideos,
  videoLoading,
  lastedLoading,
  onLoadMore,
}) => {
  const { colorMode } = useColorMode();
  const headingSizes = useBreakpointValue({
    base: 'sm',
    sm: 'sm',
    md: 'md',
  });

  return (
    <Container maxW="1170px" as={`section`} mb={8}>
      <VisuallyHidden>
        <h2>Bài viết mới</h2>
      </VisuallyHidden>
      <Stack direction={{ base: 'column', md: 'row' }} spacing={8}>
        <Box flexGrow={1}>
          {lastedPosts.map((post, index) => {
            return (
              <Box
                mb={index === lastedPosts.length - 1 ? 0 : 6}
                key={`${index}`}
              >
                <HorizontalCard
                  post={{
                    ...post,
                    imageUrl: post?.extra_info?.image ?? post.images[0].src,
                    category: post.extra_info.category
                      ? post.extra_info.category.name
                      : 'Khác',
                    publishDate:
                      post.extra_info.date_published !== null
                        ? formatUnixDate(post.extra_info.date_published / 1000)
                        : dayjs(new Date(post.createdAt)).format(
                            'dddd, DD/MM/YYYY'
                          ),
                  }}
                  showCategory={true}
                  headingProps={{
                    size: headingSizes,
                    as: `h3`,
                  }}
                />
              </Box>
            );
          })}
          <Box align={`center`} mt={8}>
            <Button
              variant={`solid`}
              colorScheme={`gray`}
              onClick={onLoadMore}
              isLoading={lastedLoading}
              loadingText="Đang tải bài viết..."
            >
              Xem thêm bài viết mới
            </Button>
          </Box>
        </Box>
        <Box w={{ lg: 350, base: `100%` }} flexShrink={{ lg: 0, sm: 1 }}>
          <CategoryTitle
            title={`Video mới`}
            icon={
              <IoVideocamOutline
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
          {videoLoading ? (
            <>
              <HorizontalCardSkeleton />
              <HorizontalCardSkeleton />
              <HorizontalCardSkeleton />
              <HorizontalCardSkeleton />
              <HorizontalCardSkeleton />
              <HorizontalCardSkeleton />
            </>
          ) : (
            lastedVideos.map((post, index) => {
              return (
                <Box
                  mb={index === lastedVideos.length - 1 ? 0 : 6}
                  key={`${index}`}
                >
                  <HorizontalCard
                    post={{
                      ...post,
                      imageUrl: post?.extra_info?.image ?? post.images[0].src,
                      category: post.extra_info.category
                        ? post.extra_info.category.name
                        : 'Khác',
                      publishDate:
                        post.extra_info.date_published !== null
                          ? formatUnixDate(
                              post.extra_info.date_published / 1000
                            )
                          : dayjs(new Date(post.createdAt)).format(
                              'dddd, DD/MM/YYYY'
                            ),
                    }}
                    showCategory={true}
                    showDescription={false}
                    headingProps={{
                      as: `h3`,
                      size: `sm`,
                    }}
                    spacing={4}
                    type={post.type}
                  />
                </Box>
              );
            })
          )}
        </Box>
      </Stack>
    </Container>
  );
};

export default LastedPostSection;
