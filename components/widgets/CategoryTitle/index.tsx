import { HeadingProps } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
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
