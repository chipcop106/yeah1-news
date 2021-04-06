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
  Container,
  Stack,
  Button,
  useColorMode,
  useBreakpointValue,
} from '@chakra-ui/react';
import Layout from '@/components/layout';
import VisuallyHidden from '@reach/visually-hidden';
import { CategoryTitle, GridPost } from '@/components/widgets';
import {
  bookPosts,
  musicPosts,
  socialPosts,
  teenPosts,
} from '../../data-sample';
import { checkScrollReachBottom, vnSlugGenerator } from '../../helpers/utils';
import { AiFillRead } from 'react-icons/ai';
import { HorizontalCard } from '@/components/BlogCard';
import { useEffect, useState } from 'react';
import {initializeApollo} from "../../lib/apolloClient";
import {ALL_CATEGORIES, GET_CONTENT_CATEGORY} from "../../services/GraphSchema";

const demoData = [
  ...teenPosts.map((post) => ({
    ...post,
    slug: vnSlugGenerator(post.title),
  })),
  ...musicPosts.map((post) => ({
    ...post,
    slug: vnSlugGenerator(post.title),
  })),
];

const Category = () => {
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
    <Box flexGrow={1}>
      <Container maxW="1170px" as={`section`} mb={8} id={`featured-post`}>
        <CategoryTitle
          title={`Giới trẻ`}
          skin={`Skin02`}
          headingProps={{
            as: `h1`,
            size: `lg`,
          }}
        />
        <GridPost loading={false} posts={demoData} skin={`Skin02`} />
      </Container>
      <Container maxW={`1170px`} as={`section`} mt={12}>
        <Divider mb={12} />
        <Stack direction={{ base: 'column-reverse', md: 'row' }} spacing={8}>
          <Box flexGrow={1}>
            <Box>
              {demoData.map((post, index) =>
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
  );
};

export async function getStaticPaths() {
  const apolloClient = initializeApollo();
  const res = await apolloClient.query({
    query: ALL_CATEGORIES,
  });
  const paths = res?.data?.categories.map((cat) => {
    console.log({cat});
    return {
      params: {
        slug: cat.slug
      }
    }
  });
  console.log({paths});
  return {
    paths,
    fallback: false // See the "fallback" section below
  };
}

export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo();
  const resCategories = await apolloClient.query({
    query: ALL_CATEGORIES,
  });
  const { categories } = resCategories.data;
  const categoryId = categories.find(category => category.slug === params.slug).id;

  await apolloClient.query({
    query: GET_CONTENT_CATEGORY,
    variables: {
      where: {
        categoryId
      }
    }
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1
  }
}

Category.layout = Layout;

export default Category;
