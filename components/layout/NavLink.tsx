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
        px={6}
        style={{ cursor: `pointer` }}

      >
        {props.children}
      </Box>
    </RouteLink>
  );
};

export default NavLink;
