import { FC, ReactNode } from 'react';
import { Link, useTheme, Box, Stack } from '@chakra-ui/react';
import { default as RouteLink } from 'next/link';
import styled from '@emotion/styled';
import theme from '@/styles/theme';
import { HiOutlineMenu } from 'react-icons/all';

interface NavLinkProps {
  isActive: boolean;
  href: string;
  children: ReactNode;
}

const NavLink: FC<NavLinkProps> = (props) => {
  const theme = useTheme();
  return (
    <RouteLink href={props.href}>
      <Box
        as={`span`}
        pos={`relative`}
        alignItems={`center`}
        pt={1}
        pb={2}
        px={6}
        style={{ cursor: `pointer` }}
        _after={{
          content: `''`,
          width: '100%',
          position: 'absolute',
          left: 0,
          bottom: 0,
          height: 1,
          opacity: props.isActive ? 1 : 0,
          backgroundColor: theme.colors.secondary,
        }}
        _hover={{
          textDecoration: `none`,
          _after: {
            opacity: 1,
          },
        }}
      >
        {props.children}
      </Box>
    </RouteLink>
  );
};

export default NavLink;
