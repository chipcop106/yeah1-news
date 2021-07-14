import { FC, ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import { default as RouteLink } from 'next/link';

interface NavLinkProps {
  isActive: boolean;
  href: string;
  children: ReactNode;
}

const NavLink: FC<NavLinkProps> = (props) => {
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
