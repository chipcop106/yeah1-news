import { FC, useEffect } from 'react';
import styled from '@emotion/styled';
import {
  Image,
  Link,
  Box,
  useTheme,
  Text,
  Heading,
  Stack,
  HStack,
  Tag,
  Button,
  useColorMode,
  useBreakpointValue,
} from '@chakra-ui/react';
import { default as RouteLink } from 'next/link';
import date from 'date-fns';
import format from 'date-fns/format';

const headingMarkups = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

interface Post {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  hTag?: string | 'h3';
  description: string;
  link: string;
  publishDate: string;
  isFeatured?: boolean;
  slug: string;
}

interface PostProps {
  posts?: Array<Post>;
  loading?: boolean;
}

const FeaturedStyle = styled.div``;

const Skin01: FC<PostProps> = ({ posts = [] }) => {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const headingSizes = useBreakpointValue({ md: `md`, base: `sm` });
  if (posts.length === 0) return <Text color={`red.500`}>No posts found</Text>;
  return (
    <FeaturedStyle>
      <Stack
        direction={{
          md: 'row',
          base: 'column',
        }}
        spacing={2}
        alignItems={`stretch`}
        maxH={`500px`}
      >
        <Box
          flexShrink={0}
          width={{ md: `65%`, base: `100%` }}
          pos={`relative`}
        >
          <RouteLink href={`/article/${posts[0].slug}`}>
            <Link
              pos={`relative`}
              display={`block`}
              _hover={{
                textDecoration: 'none',
              }}
              _focus={{
                outline: 0,
              }}
              h={`100%`}
            >
              <Image
                w={`100%`}
                h={`100%`}
                minH={`300px`}
                src={posts[0].imageUrl}
                fit={`cover`}
              />
              <Box
                bgColor={`rgba(0,0,0,.35)`}
                pos={`absolute`}
                bottom={0}
                left={0}
                w={`100%`}
                h={`100%`}
              ></Box>
              <Box pos={`absolute`} bottom={6} left={6} right={6} zIndex={2}>
                <Heading as={`h3`} size={`lg`} color={`white`}>
                  {posts[0].title}
                </Heading>
                <HStack spacing={2} mt={4} alignItems={`center`}>
                  <Tag
                    borderRadius={0}
                    size={`sm`}
                    key={`sm`}
                    variant="solid"
                    colorScheme="brand"
                  >
                    {posts[0].category}
                  </Tag>
                  <Text color={`gray.200`} fontSize={`sm`}>
                    {posts[0].publishDate}
                  </Text>
                </HStack>
                <Text
                  color={`gray.200`}
                  display={{ base: `none`, md: `block` }}
                  mt={4}
                >
                  {posts[0].description}
                </Text>
              </Box>
            </Link>
          </RouteLink>
        </Box>
        <Stack
          direction={{
            md: 'column',
            base: 'row',
          }}
          spacing={2}
          overflowX={`auto`}
          overflowY={{
            md: `auto`,
            base: `hidden`,
          }}
          flexGrow={1}
        >
          {posts.map(
            (post, index) =>
              index > 0 && (
                <Box
                  key={`${post.id}`}
                  pos={`relative`}
                  w={{ md: `100%`, sm: `50%`, base: `80%` }}
                  h={{ md: `100%`, sm: 200, base: 175 }}
                  flexShrink={{ md: 1, base: 0 }}
                >
                  <RouteLink href={`/article/slug`}>
                    <Link
                      pos={`relative`}
                      display={`block`}
                      _hover={{
                        textDecoration: 'none',
                      }}
                      _focus={{
                        outline: 0,
                      }}
                      h={`100%`}
                    >
                      <Image
                        h={`100%`}
                        w={`100%`}
                        src={post.imageUrl}
                        fit={`cover`}
                      />
                      <Box
                        bgColor={`rgba(0,0,0,.25)`}
                        pos={`absolute`}
                        bottom={0}
                        left={0}
                        w={`100%`}
                        h={`100%`}
                      ></Box>
                      <Box
                        pos={`absolute`}
                        bottom={6}
                        left={6}
                        right={6}
                        zIndex={2}
                      >
                        <Heading
                          as={`h3`}
                          size={headingSizes}
                          color={`white`}
                          fontWeight={`semibold`}
                        >
                          {post.title}
                        </Heading>
                        <HStack spacing={2} mt={4} alignItems={`center`}>
                          <Tag
                            borderRadius={0}
                            size={`sm`}
                            key={`sm`}
                            variant="solid"
                            colorScheme="brand"
                          >
                            {post.category}
                          </Tag>
                          <Text color={`gray.200`} fontSize={`sm`}>
                            {post.publishDate}
                          </Text>
                        </HStack>
                      </Box>
                    </Link>
                  </RouteLink>
                </Box>
              )
          )}
        </Stack>
      </Stack>
    </FeaturedStyle>
  );
};

export default Skin01;
