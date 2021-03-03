import {
  Heading,
  HStack,
  HeadingProps,
  Box,
  Divider,
  useColorMode,
} from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { IoFolderOutline } from 'react-icons/io5';
import styled from '@emotion/styled';
import { Skin01, Skin02 } from './skin';

const templates = {
  Skin01,
  Skin02,
};

interface TitleProps {
  title: string;
  icon?: ReactNode;
  headingProps?: HeadingProps;
  skin?: string;
}

const CategoryTitle: FC<TitleProps> = (props) => {
  const Template = templates[props?.skin ?? 'Skin01'];
  return <Template {...props} />;
};

export default CategoryTitle;
