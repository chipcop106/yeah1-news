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
  Image,
  HeadingProps,
} from '@chakra-ui/react';
import { default as RouteLink } from 'next/link';

interface Post {
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

const StyleBox = styled(Box)`
  border: 0;
  .chakra-heading {
    transition: color 0.3s ease;
  }
  img {
    transition: all 2.5s ease;
  }
  &:hover {
    img {
      transform: scale(1.2);
    }
  }
`;

interface CardProps {
  post: Post;
  headingProps: HeadingProps;
  loading?: boolean;
}

const TransparentCard: FC<CardProps> = ({
  post,
  headingProps,
  loading = false,
}) => {
  return (
    <StyleBox
      as={`article`}
      pos={`relative`}
      w={`100%`}
      overflow={`hidden`}
      borderRadius={6}
    >
      <RouteLink href={`/article/${post.slug}`}>
        <Link
          pos={`relative`}
          _hover={{
            textDecoration: 'none',
          }}
          _focus={{
            outline: 0,
          }}
          h={`100%`}
          pt={40}
          display={`flex`}
          alignItems={`flex-end`}
          pb={6}
        >
          <Image
            w={`100%`}
            h={`100%`}
            minH={`300`}
            src={post.imageUrl}
            fit={`cover`}
            pos={`absolute`}
            top={0}
            left={0}
          />
          <Box
            bg={`linear-gradient(0deg, rgb(4, 4, 125) 50%, rgb(215, 211, 249) 75%)`}
            opacity={0.25}
            pos={`absolute`}
            bottom={0}
            left={0}
            w={`100%`}
            h={`100%`}
          ></Box>

          <Box pos={`relative`} zIndex={2} p={6} pb={0}>
            <Heading
              {...headingProps}
              as={headingProps?.as ?? `h3`}
              size={headingProps?.size ?? 'lg'}
              align={`center`}
            >
              {post.title}
            </Heading>
            <HStack spacing={2} mt={4} justifyContent={`center`}>
              <Tag size={`sm`} key={`sm`} variant="solid" colorScheme="brand">
                {post.category}
              </Tag>
              <Text color={`gray.200`} fontSize={`sm`} align={`center`}>
                {post.publishDate}
              </Text>
            </HStack>
            {/*<Text*/}
            {/*  color={`gray.200`}*/}
            {/*  display={{ sm: `none`, md: `block` }}*/}
            {/*  mt={4}*/}
            {/*>*/}
            {/*  {post.description}*/}
            {/*</Text>*/}
          </Box>
        </Link>
      </RouteLink>
    </StyleBox>
  );
};

export default TransparentCard;
