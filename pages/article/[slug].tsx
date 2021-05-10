import {
  Image,
  Heading,
  Box,
  Divider,
  Text,
  Container,
  HStack,
  useColorMode,
  Tag,
  Link,
  Stack,
  Button,
  useBreakpointValue,
  Spinner,
} from '@chakra-ui/react';
import Layout from '@/components/layout';
import { FaBookReader } from 'react-icons/fa';
import {
  checkScrollReachBottom,
  formatUnixDate,
  vnSlugGenerator,
} from '../../helpers/utils';
import { HorizontalCard } from '@/components/BlogCard';
import CategoryTitle from '../../components/widgets/CategoryTitle';
import { AiFillRead } from 'react-icons/ai';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { NextSeo } from 'next-seo';
import { initializeApollo } from '../../lib/apolloClient';
import { GET_POST, ALL_CATEGORIES, GET_POSTS } from '@/services/GraphSchema';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import useScrollBottom from '@/hooks/useScrollBottom';

const Article = () => {
  const router = useRouter();
  const { colorMode } = useColorMode();
  const { isReachBottom } = useScrollBottom();
  const [offset, setOffset] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const headingSizes = useBreakpointValue({
    base: 'sm',
    sm: 'sm',
    md: 'md',
  });
  const { loading: postLoading, error: postError, data: postData } = useQuery(
    GET_POST,
    {
      variables: {
        id: router.query.slug,
        command: 'web',
      },
    }
  );

  const { loading: relatedLoading, data: relatedData, fetchMore } = useQuery(
    GET_POSTS,
    {
      variables: {
        where: {
          content_tags_in: postData.content.content_tags,
        },
        command: `contenttag:${JSON.stringify(postData.content_tags)}`,
        limit: 10,
        start: 0,
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  const loadmoreRelatedPost = useCallback(() => {
    fetchMore({
      variables: {
        where: {
          content_tags_in: postData.content.content_tags,
        },
        command: `contenttag:${JSON.stringify(postData.content_tags)}`,
        limit: 10,
        start:
          relatedData && !!relatedData.getPosts
            ? relatedData.getPosts.length
            : 0,
      },
    });
  }, [isReachBottom]);

  useEffect(() => {
    loadmoreRelatedPost();
  }, [isReachBottom]);

  if (postLoading)
    return (
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        flexGrow={1}
        height="100vh"
      >
        <Spinner size="xl" />
      </Stack>
    );

  if (!postData) return null;
  const article = useMemo(() => postData.content, [postData]);
  console.log({ article });

  useEffect(() => {
    if (article) {
      try {
        fetchMore({
          variables: {
            where: {
              categoryId: article.extra_info.category.id,
            },
            command: `category:${article.extra_info.category.id}`,
            limit: 10,
            start:
              relatedData && !!relatedData.getPosts
                ? relatedData.getPosts.length
                : 0,
          },
        });
      } catch (e) {
        console.log({ e });
      }
    }
  }, [offset]);
  return (
    <>
      <NextSeo
        title={article.title}
        description={article.description}
        openGraph={{
          url: `${
            process.env.BASE_URL
              ? process.env.BASE_URL
              : 'http://localhost:3000'
          }/article/${article.slug}`,
          title: article.title,
          description: article.description,
          images: [
            {
              url: article?.imageUrl ?? article.extra_info.image,
              alt: vnSlugGenerator(article.title, ' '),
              width: 1280,
              height: 720,
            },
          ],
        }}
      />

      <Box flexGrow={1} py={12}>
        <Container maxW={`1170px`} as={`section`}>
          <Stack
            spacing={16}
            ml={3}
            direction={{
              md: `row`,
              base: `column-reverse`,
            }}
          >
            <Box
              bg={colorMode === 'light' ? 'white' : 'gray.800'}
              p={{
                md: 8,
                sm: 6,
                base: 4,
              }}
              pos={`relative`}
              _after={{
                content: `''`,
                width: 75,
                height: 100,
                background:
                  colorMode === 'light'
                    ? `linear-gradient(39deg, rgba(0,0,153,1) 0%, rgba(2,240,220,1) 100%)`
                    : `linear-gradient(39deg, rgba(0,0,153,1) 0%, rgba(2,240,220,1) 100%)`,
                position: `absolute`,
                bottom: -3,
                right: -3,
                zIndex: -1,
              }}
              _before={{
                content: `''`,
                width: 75,
                height: 100,
                background:
                  colorMode === 'light'
                    ? `linear-gradient(39deg, rgba(0,0,153,1) 0%, rgba(2,240,220,1) 100%)`
                    : `linear-gradient(39deg, rgba(0,0,153,1) 0%, rgba(2,240,220,1) 100%)`,
                position: `absolute`,
                top: -3,
                left: -3,
                zIndex: -1,
              }}
              flex={1}
            >
              <Heading as={`h1`}>{article?.title}</Heading>
              <HStack spacing={2} my={4} alignItems={`center`}>
                <Tag
                  borderRadius={0}
                  size={`sm`}
                  key={`sm`}
                  variant="solid"
                  colorScheme="brand"
                >
                  {article.extra_info?.category?.name ?? 'Khác'}
                </Tag>
                <Text color={`gray.500`} fontSize={`sm`}>
                  {article?.publishDate}
                </Text>
              </HStack>
              <Text>{article?.description}</Text>
              <Button
                //        bgGradient="linear(to-r, secondBrand.200, secondBrand.500)"
                mt={4}
                size={`sm`}
                variant={`solid`}
                colorScheme={`yellow`}
                leftIcon={<FaBookReader />}
                borderRadius={0}
              >
                <Link
                  href={article.link}
                  target={`_blank`}
                  rel={`noopener`}
                  _hover={{ textDecoration: 'none' }}
                >
                  Xem bài viết
                </Link>
              </Button>
            </Box>
            <Box
              _after={{
                transform: `scale(0.95) translateY(36px) translateZ(-30px)`,
                filter:
                  colorMode === 'light'
                    ? `blur(20px) brightness(100%)`
                    : `blur(20px) brightness(40%)`,
                opacity: 0.9,
                content: `''`,
                position: `absolute`,
                width: `100%`,
                height: `100%`,
                backgroundImage: `inherit`,
                backgroundSize: `cover`,
                zIndex: -1,
                transition: `filter .3s ease`,
              }}
              as={`div`}
              flex={1}
              h={`100%`}
              minH={`300px`}
              pos={`relative`}
              bgPosition={`center 50%`}
              bgSize={`cover`}
              borderRadius={16}
              bgImage={`url('${
                article?.imageUrl ?? article.extra_info.image
              }')`}
            ></Box>
          </Stack>
        </Container>

        <Container maxW={`1170px`} as={`section`} mt={12}>
          <Divider mb={12} />
          <Stack direction={{ base: 'column-reverse', md: 'row' }} spacing={8}>
            <Box flexGrow={1}>
              <CategoryTitle
                title={`Bài viết cùng chủ đề`}
                icon={
                  <AiFillRead
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
              <Box>
                {relatedData &&
                  relatedData.getPosts &&
                  relatedData.getPosts.length &&
                  relatedData.getPosts
                    .filter((p) => p.slug !== postData.content.slug)
                    .map((post, index) => (
                      <Box
                        mb={index === relatedData.getPosts.length - 1 ? 0 : 6}
                        key={`${index}`}
                      >
                        <HorizontalCard
                          post={{
                            ...post,
                            imageUrl:
                              post.images[0]?.src ?? post.extra_info.image,
                            category: post.extra_info.category.name,
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
                {relatedLoading && (
                  <Box align={`center`} mt={8}>
                    <Button
                      variant={`solid`}
                      colorScheme={`gray`}
                      onClick={loadmoreRelatedPost}
                      isLoading={relatedLoading}
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
    </>
  );
};

export async function getServerSideProps({ params }) {
  const apolloClient = initializeApollo();

  const res = await apolloClient.query({
    query: GET_POST,
    variables: {
      id: params.slug,
    },
  });

  const article = res.data.content;
  console.log({ article });
  if (!article || !article.extra_info.category) {
    return {
      notFound: true,
    };
  }
  await apolloClient.query({
    query: GET_POSTS,
    variables: {
      where: {
        categoryId: article.extra_info.category.id,
      },
      command: `category:${article.extra_info.category.id}`,
      limit: 10,
      start: 0,
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

Article.layout = Layout;

export default Article;
