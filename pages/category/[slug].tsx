import { useCallback, useMemo } from 'react';
import {
  Image,
  Box,
  Divider,
  Container,
  Stack,
  Button,
  useBreakpointValue,
} from '@chakra-ui/react';
import Layout from '@/components/layout';

import { CategoryTitle, GridPost } from '@/components/widgets';

import { formatUnixDate } from '../../helpers/utils';
import { HorizontalCard } from '@/components/BlogCard';
import { useEffect } from 'react';
import { initializeApollo } from '../../lib/apolloClient';
import { ALL_CATEGORIES, GET_POSTS } from '../../services/GraphSchema';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import useScrollBottom from '@/hooks/useScrollBottom';

const Category = () => {
  const router = useRouter();
  const { isReachBottom } = useScrollBottom();
  const { slug } = router.query;
  const headingSizes = useBreakpointValue({
    base: 'sm',
    sm: 'sm',
    md: 'md',
  });
  const { data: catData } = useQuery(ALL_CATEGORIES);

  const category = useMemo(
    () => catData.categories.find((cat) => cat.slug === slug),
    [catData]
  );
  const { loading, data, fetchMore } = useQuery(GET_POSTS, {
    variables: {
      where: {
        categoryId: category.id,
      },
      limit: 20,
      start: 0,
      command: `category:${category.id}`,
    },
    notifyOnNetworkStatusChange: true,
  });

  const loadmoreRelatedPost = useCallback(() => {
    fetchMore({
      variables: {
        where: {
          categoryId: category.id,
        },
        limit: 10,
        start: data.getPosts.length + 20,
      },
    });
  }, [isReachBottom]);

  useEffect(() => {
    loadmoreRelatedPost();
  }, [isReachBottom]);

  return (
    <Box flexGrow={1}>
      <Container maxW="1170px" as={`section`} mb={8} id={`featured-post`}>
        <CategoryTitle
          title={category.name}
          skin={`Skin02`}
          headingProps={{
            as: `h1`,
            size: `lg`,
          }}
        />
        {!loading && (
          <GridPost
            loading={loading}
            posts={data.getPosts
              .filter((p, i) => i < 10)
              .map((post) => ({
                ...post,
                imageUrl: post.images[0]?.src ?? post.extra_info.image,
                category: category.name,
                publishDate:
                  post.extra_info.date_published !== null
                    ? formatUnixDate(post.extra_info.date_published / 1000)
                    : dayjs(new Date(post.createdAt)).format(
                        'dddd, DD/MM/YYYY'
                      ),
              }))}
            skin={`Skin02`}
          />
        )}
      </Container>
      <Container maxW={`1170px`} as={`section`} mt={12}>
        <Divider mb={12} />
        <Stack direction={{ base: 'column-reverse', md: 'row' }} spacing={8}>
          <Box flexGrow={1}>
            <Box>
              {data.getPosts
                .filter((p, i) => i >= 10)
                .map((post, index) => (
                  <Box mb={6} key={`${index}`}>
                    <HorizontalCard
                      post={{
                        ...post,
                        imageUrl: post.images[0]?.src ?? post.extra_info.image,
                        category: category.name,
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
                      headingProps={{
                        size: headingSizes,
                        as: `h3`,
                      }}
                    />
                  </Box>
                ))}
              {loading && (
                <Box align={`center`} mt={8}>
                  <Button
                    variant={`solid`}
                    colorScheme={`gray`}
                    onClick={loadmoreRelatedPost}
                    isLoading={loading}
                    loadingText="Đang tải bài viết..."
                  >
                    Xem thêm bài viết mới
                  </Button>
                </Box>
              )}
            </Box>
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
                alt={`advertiser`}
              />
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export async function getStaticPaths() {
  const apolloClient = initializeApollo();
  const res = await apolloClient.query({
    query: ALL_CATEGORIES,
  });
  const paths = res?.data?.categories.map((cat) => {
    return {
      params: {
        slug: cat.slug,
      },
    };
  });
  return {
    paths,
    fallback: false, // See the "fallback" section below
  };
}

export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo();
  const resCategories = await apolloClient.query({
    query: ALL_CATEGORIES,
  });
  const { categories } = resCategories.data;
  const categoryId = categories.find(
    (category) => category.slug === params.slug
  ).id;

  const res = await apolloClient.query({
    query: GET_POSTS,
    variables: {
      where: {
        categoryId,
      },
      limit: 20,
      start: 0,
      command: `category:${categoryId}`,
    },
  });

  if (!res.data.getPosts) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      key: params.slug,
    },
    revalidate: 1,
  };
}

Category.layout = Layout;

export default Category;
