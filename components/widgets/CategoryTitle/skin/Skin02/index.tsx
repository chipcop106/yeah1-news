import {
  Heading,
  HStack,
  HeadingProps,
  Box,
  useColorMode,
} from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { IoFolderOutline } from 'react-icons/io5';
import styled from '@emotion/styled';
interface TitleProps {
  title: string;
  icon?: ReactNode;
  headingProps?: HeadingProps;
}

const StyledBox = styled(Box)`
  position: relative;
`;

const Skin02: FC<TitleProps> = ({
  title,
  icon = <IoFolderOutline />,
  headingProps,
}) => {
  const { colorMode } = useColorMode();
  return (
    <StyledBox
      mb={8}
      zIndex={2}
      _after={{
        content: `''`,
        position: 'absolute',
        top: 0,
        left: `3px`,
        width: `7px`,
        height: `100%`,
        background: `linear-gradient(90deg,rgb(71, 255, 255) 0%,rgb(96, 217, 172) 11%,rgb(2, 240, 220) 17%,rgb(38, 213, 213) 97%)`,
        zIndex: 2,
        transform: `skewX(-20deg)`,
      }}
      pl={6}
    >
      <HStack alignItems={`center`} spacing={2}>
        <Heading
          {...headingProps}
          color={colorMode === 'light' ? '#000' : '#c9c9c9'}
        >
          {title}
        </Heading>
      </HStack>
    </StyledBox>
  );
};

export default Skin02;
