import React, { FC } from 'react';
import {
  Link,
  Box,
  Text,
  Heading,
  HStack,
  Tag,
  HeadingProps,
} from '@chakra-ui/react';
import { AiOutlinePlayCircle } from 'react-icons/ai';
import { default as RouteLink } from 'next/link';
import Skeleton from 'react-loading-skeleton';
import LazyLoad from 'react-lazyload';

export interface Post {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  description: string;
  publishDate: string;
  slug: string;
}

type space = {
  sm?: string | number;
  md?: string | number;
  lg?: string | number;
  xl?: string | number;
  '2xl'?: string | number;
};

export interface CardProps {
  post: Post;
  showCategory?: boolean;
  showDescription?: boolean;
  headingProps?: HeadingProps;
  spacing?: number | string | space;
  type?: string;
}

const HorizontalCard: FC<CardProps> = ({
  post,
  showCategory = true,
  showDescription = true,
  headingProps,
  spacing = {
    xl: 4,
    md: 4,
    sm: 4,
    base: 4,
  },
  type = 'link',
}) => {
  return (
    <HStack spacing={spacing} alignItems={`flex-start`}>
      <Box
        pos={`relative`}
        w={`30%`}
        flexShrink={0}
        boxShadow={`base`}
        _hover={{
          boxShadow: `lg`,
          transition: 'box-shadow .3s ease',
        }}
      >
        <RouteLink href={`/article/${post.slug}`}>
          <Link pos={`relative`} display={`block`} pb={`72%`}>
            <LazyLoad once>
              <Box
                as={`span`}
                pos={`absolute`}
                w={`100%`}
                h={`100%`}
                bgPosition={`center 50%`}
                bgSize={`cover`}
                bgImage={`url('${post.imageUrl}')`}
                className={`post-image`}
              />
            </LazyLoad>
            {type === 'video' && (
              <Box
                pos={`absolute`}
                left={`50%`}
                top={`50%`}
                style={{ transform: `translate(-50%, -50%)` }}
                opacity={0.75}
                borderRadius={`base`}
              >
                <AiOutlinePlayCircle fontSize={`2.5rem`} color={`white`} />
              </Box>
            )}
          </Link>
        </RouteLink>
      </Box>
      <Box flexGrow={1}>
        <RouteLink href={`/article/${post.slug}`}>
          <Link>
            <Heading
              mb={2}
              fontWeight={`semibold`}
              {...headingProps}
              data-testid="title"
            >
              {post.title || <Skeleton />}
            </Heading>
          </Link>
        </RouteLink>
        <HStack spacing={2} mt={2} alignItems={`center`}>
          {showCategory && (
            <Tag
              borderRadius={0}
              size={`sm`}
              key={`sm`}
              variant="solid"
              colorScheme="brand"
              data-testid="category"
            >
              {post.category || <Skeleton />}
            </Tag>
          )}

          <Text color={`gray.500`} fontSize={`sm`}>
            {post.publishDate}
          </Text>
        </HStack>
        {showDescription && (
          <Text
            color={`gray.500`}
            display={{ base: `none`, md: `block` }}
            mt={2}
            fontSize={`sm`}
            noOfLines={2}
            data-testid="description"
          >
            {post.description || <Skeleton count={3} />}
          </Text>
        )}
      </Box>
    </HStack>
  );
};

export default HorizontalCard;
