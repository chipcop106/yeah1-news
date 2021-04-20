import { FC } from 'react';
import styled from '@emotion/styled';
import {
  Image,
  Link,
  Box,
  Text,
  Heading,
  Stack,
  HStack,
  Tag,
} from '@chakra-ui/react';
import { default as RouteLink } from 'next/link';
import { HorizontalCard } from '@/components/BlogCard';

interface Post {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  hTag?: string | 'h3';
  description: string;
  link?: string;
  publishDate: string;
  isFeatured?: boolean;
  slug: string;
}

interface PostProps {
  posts?: Array<Post>;
  loading: boolean;
  limit?: number;
}

const FeaturedStyle = styled.div``;

const GridPost: FC<PostProps> = ({ posts = [], loading, limit = 10 }) => {
  if (posts.length === 0)
    return (
      <Text color={`red.500`} textAlign="center">
        No posts found
      </Text>
    );
  return (
    <FeaturedStyle>
      <Stack direction={`column`} spacing={4} alignItems={`stretch`}>
        {posts.map((post, index) =>
          index < limit ? (
            index === 0 ? (
              <Box
                key={`${post.id}`}
                flexShrink={0}
                width={`100%`}
                pos={`relative`}
              >
                <RouteLink href={`/article/${post.slug}`}>
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
                      height={`250px`}
                      src={post.imageUrl}
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
                    <Box
                      pos={`absolute`}
                      bottom={6}
                      left={6}
                      right={6}
                      zIndex={2}
                    >
                      <Heading as={`h3`} size={`md`} color={`white`}>
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
                      {/*<Text*/}
                      {/*  color={`gray.200`}*/}
                      {/*  display={{ base: `none`, md: `block` }}*/}
                      {/*  mt={4}*/}
                      {/*>*/}
                      {/*  {post.description}*/}
                      {/*</Text>*/}
                    </Box>
                  </Link>
                </RouteLink>
              </Box>
            ) : (
              <HorizontalCard
                key={`${post.id}`}
                post={post}
                showCategory={true}
                showDescription={false}
                headingProps={{
                  as: `h3`,
                  size: `sm`,
                }}
                spacing={4}
              />
            )
          ) : (
            ''
          )
        )}
      </Stack>
    </FeaturedStyle>
  );
};

export default GridPost;
