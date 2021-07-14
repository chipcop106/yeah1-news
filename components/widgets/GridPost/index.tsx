import { FC } from 'react';
import styled from '@emotion/styled';
import { useTheme, Text, useColorMode } from '@chakra-ui/react';

import { Skin01, Skin02 } from '@/components/widgets/GridPost/skin';

const templates = {
  Skin01,
  Skin02,
};

interface Post {
  title: string;
  imageUrl: string;
  category: string;
  hTag?: string | 'h3';
  description: string;
  publishDate: string;
  isFeatured?: boolean;
  slug: string;
}

interface PostProps {
  posts: Array<Post>;
  loading?: boolean;
  skin?: string;
}

const FeaturedStyle = styled.div``;

const GridPost: FC<PostProps> = (props) => {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const Template = templates[props?.skin ?? 'Skin01'];
  if (props.posts.length === 0)
    return <Text color={`red.500`}>No posts found</Text>;
  return <Template {...props} />;
};

export default GridPost;
