import { FC } from 'react';
import styled from '@emotion/styled';
import {
  Img,
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
  HeadingProps,
} from '@chakra-ui/react';
import { IoPeopleOutline, IoPlayOutline } from 'react-icons/io5';
import { AiOutlinePlayCircle } from 'react-icons/ai';
import { default as RouteLink } from 'next/link';

interface Post {
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

interface CardProps {
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
            <Box
              as={`span`}
              pos={`absolute`}
              w={`100%`}
              h={`100%`}
              bgPosition={`center 50%`}
              bgSize={`cover`}
              bgImage={`url('${post.imageUrl}')`}
            ></Box>
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
            <Heading mb={2} fontWeight={`semibold`} {...headingProps}>
              {post.title}
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
            >
              {post.category}
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
          >
            {post.description}
          </Text>
        )}
      </Box>
    </HStack>
  );
};

export default HorizontalCard;
