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

const Skin01: FC<TitleProps> = ({
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
        bottom: 0,
        left: 0,
        width: '75%',
        maxWidth: '200px',
        height: '12px',
        borderRadius: 0,
        background:
          colorMode === 'light'
            ? `linear-gradient(90deg,rgba(71, 71, 255, 1) 0%,rgba(88, 212, 247, 1) 11%,rgba(2, 240, 220, 1) 17%,rgba(246, 255, 255, 1) 97%)`
            : `linear-gradient(90deg, rgb(26, 48, 83) 0%, rgb(26, 38, 72) 11%, rgb(31, 57, 79) 17%, rgb(25, 30, 36) 97%)`,
        zIndex: -1,
      }}
    >
      <HStack alignItems={`center`} spacing={2}>
        {icon}
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

export default Skin01;
