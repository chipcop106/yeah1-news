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
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
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

const Skin02: FC<PostProps> = ({ posts = [] }) => {
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
        maxH={{ md: `500px`, base: `100%` }}
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
                minH={`300`}
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
        <Box as={PerfectScrollbar} flexGrow={1} height={500}>
          {posts.map(
            (post, index) =>
              index > 0 && (
                <Box mb={4} key={`${post.id}`}>
                  <HorizontalCard
                    post={post}
                    headingProps={{
                      as: `h3`,
                      size: `sm`,
                    }}
                    showDescription={false}
                  />
                </Box>
              )
          )}
        </Box>
      </Stack>
    </FeaturedStyle>
  );
};

export default Skin02;
