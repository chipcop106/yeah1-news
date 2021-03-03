import {
  Avatar,
  Image,
  Heading,
  Box,
  Divider,
  ListItem,
  UnorderedList,
  ListIcon,
  Text,
  Img,
  Container,
  HStack,
  useColorMode,
  Tag,
  Link,
  Stack,
  Button,
  useBreakpointValue,
} from '@chakra-ui/react';
import Layout from '@/components/layout';
import { FaBookReader } from 'react-icons/fa';
import { socialPosts, trendingPosts } from '../../data-sample';
import { checkScrollReachBottom, vnSlugGenerator } from '../../helpers/utils';
import { HorizontalCard } from '@/components/BlogCard';
import CategoryTitle from '../../components/widgets/CategoryTitle';
import { IoPeopleOutline, IoTimerOutline } from 'react-icons/io5';
import { AiFillRead } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';

const Article = ({ relatedArticles, article }) => {
  const { colorMode } = useColorMode();
  const [isLoading, setIsLoading] = useState(false);
  const headingSizes = useBreakpointValue({
    base: 'sm',
    sm: 'sm',
    md: 'md',
  });

  const loadmoreRelatedPost = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleScroll = () => {
    const isReachBottom = checkScrollReachBottom();
    isReachBottom && loadmoreRelatedPost();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);

  return (
    <>
      <NextSeo
        title={article.title}
        description={article.description}
        openGraph={{
          url: `/article/${vnSlugGenerator(article.title)}`,
          title: article.title,
          description: article.description,
          images: [
            {
              url: article.imageUrl,
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
                  {article?.category}
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
                  href={`https://zingnews.vn/nguoi-dan-se-duoc-tiem-vaccine-ngua-covid-19-mien-phi-post1186491.html`}
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
              bgImage={`url('${article?.imageUrl}')`}
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
                {relatedArticles.map((post, index) =>
                  index === socialPosts.length - 1 ? (
                    <Box key={`${index}`}>
                      <HorizontalCard
                        post={{ ...post, slug: vnSlugGenerator(post.title) }}
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
                        post={{ ...post, slug: vnSlugGenerator(post.title) }}
                        showCategory={true}
                        headingProps={{
                          size: headingSizes,
                          as: `h3`,
                        }}
                      />
                    </Box>
                  )
                )}
                {isLoading && (
                  <Box align={`center`} mt={8}>
                    <Button
                      variant={`solid`}
                      colorScheme={`gray`}
                      onClick={loadmoreRelatedPost}
                      isLoading={isLoading}
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

export async function getServerSideProps() {
  const relatedArticles = [...socialPosts, ...trendingPosts];
  const article = relatedArticles[0];
  if (!article) {
    return {
      notFound: true,
    };
  }

  return {
    props: { relatedArticles, article },
  };
}

Article.layout = Layout;

export default Article;
