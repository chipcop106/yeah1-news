import { FC, useEffect, useRef, useState } from 'react';
import {
  Stack,
  Wrap,
  WrapItem,
  IconButton,
  Image,
  Box,
  Link,
  Container,
  Input,
  Button,
  Collapse,
  HStack,
  useColorMode,
  Heading,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { default as RouteLink } from 'next/link';
import NavLink from '@/components/layout/NavLink';
import {
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoYoutube,
  IoSearch,
  IoCloseOutline,
} from 'react-icons/io5';
import { useTheme, VisuallyHidden } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { VscColorMode, VscChromeClose } from 'react-icons/vsc';
import { CgDarkMode } from 'react-icons/cg';
import { FiMenu } from 'react-icons/fi';
import { AiOutlineHome } from 'react-icons/ai';
import {
  IoTimerOutline,
  IoAccessibilityOutline,
  IoPeopleOutline,
  IoMusicalNotesOutline,
} from 'react-icons/io5';
import { FaBasketballBall } from 'react-icons/fa';
import { MdOndemandVideo } from 'react-icons/md';
import { GiBlackBook } from 'react-icons/gi';
import { IoIosPeople } from 'react-icons/io';
import { nanoid } from 'nanoid';

const menuLists = [
  {
    id: nanoid(),
    title: 'Tin nóng 24h',
    slug: 'tin-nong-24h',
    icon: <IoTimerOutline />,
  },
  {
    id: nanoid(),
    title: 'Xã hội',
    slug: 'xa-hoi',
    icon: <IoPeopleOutline />,
  },
  {
    id: nanoid(),
    title: 'Giới trẻ',
    slug: 'gioi-tre',
    icon: <IoAccessibilityOutline />,
  },
  {
    id: nanoid(),
    title: 'Âm nhạc',
    slug: 'am-nhac',
    icon: <IoMusicalNotesOutline />,
  },
  {
    id: nanoid(),
    title: 'Thể thao',
    slug: 'the-thao',
    icon: <FaBasketballBall />,
  },
  {
    id: nanoid(),
    title: 'Đời sống',
    slug: 'doi-song',
    icon: <IoIosPeople />,
  },
];

const SearchStyle = styled.div`
  position: relative;
  max-width: 500px;
  margin: 0 auto;
  & #search-btn {
    z-index: 2;
  }
`;

const Styled = styled(Box)`
  @keyframes slideDown {
    from {
      transform: translateY(-39px);
    }
    to {
      transform: translateY(0);
    }
  }

  #header-top {
  }
  #sticky-actions {
    display: none;
  }
  &.sticky {
    position: sticky;
    top: 0;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
    animation: slideDown 1s ease;
    @media (min-width: 768px) {
      #header-top {
        visibility: hidden;
        height: 0;
        padding: 0;
        display: none;
      }
      #header-bottom {
      }
      #sticky-actions {
        display: flex;
      }
    }
  }
  @media (max-width: 768px) {
    #header-top {
      .social-links {
        display: none;
      }
    }
    #menu-wrap {
      position: absolute;
      top: calc(100% + 4px);
      background: rgb(255, 255, 255) none repeat scroll 0% 0%;
      left: 0px;
      width: 100%;
      padding: 0px 1rem;
      box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.25);
    }
  }
`;

const Header: FC = () => {
  const [showSearch, setShowSearch] = useState(false);
  const theme = useTheme();
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const [isSticky, setSticky] = useState(false);
  const ref = useRef(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const isShowMobileMenu = useBreakpointValue({
    base: showMobileMenu,
    md: true,
  });
  const _toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleScroll = (evt) => {
    const scrollPos = document.documentElement.scrollTop;
    if (ref.current) {
      const eleHeight = ref.current.offsetHeight;
      setSticky(scrollPos > eleHeight);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);

  const _toggleSearchBar = () => {
    setShowSearch(!showSearch);
  };

  return (
    <Styled
      borderBottom={`4px`}
      borderBottomColor={
        colorMode === 'light' ? theme.colors.primary : 'gray.600'
      }
      borderBottomStyle={`solid`}
      as={`header`}
      position={`relative`}
      zIndex={1100}
      ref={ref}
      className={isSticky ? 'sticky' : ''}
    >
      <Box
        bgColor={colorMode === 'light' ? `white` : `gray.800`}
        zIndex={3}
        pos={`relative`}
      >
        <Container maxW="1170px">
          <Stack
            direction={`row`}
            justify={`space-between`}
            py={4}
            id={`header-top`}
            alignItems={`center`}
          >
            <IconButton
              aria-label="Toggle menu"
              icon={
                showMobileMenu ? (
                  <VscChromeClose fontSize={`2rem`} />
                ) : (
                  <FiMenu fontSize={`2rem`} />
                )
              }
              variant={`ghost`}
              display={{
                md: 'none',
                base: 'inline-flex',
              }}
              onClick={_toggleMobileMenu}
            />

            <Wrap spacing={2} className={`social-links`}>
              <WrapItem>
                <IconButton
                  colorScheme={`gray`}
                  aria-label="Facebook"
                  variant={`ghost`}
                  icon={<IoLogoFacebook />}
                  isRound={true}
                  fontSize="24px"
                />
              </WrapItem>
              <WrapItem>
                <IconButton
                  colorScheme={`gray`}
                  aria-label="Twitter"
                  variant={`ghost`}
                  icon={<IoLogoTwitter />}
                  isRound={true}
                  fontSize="24px"
                />
              </WrapItem>
              <WrapItem>
                <IconButton
                  colorScheme={`gray`}
                  aria-label="Youtube"
                  variant={`ghost`}
                  icon={<IoLogoYoutube />}
                  isRound={true}
                  fontSize="24px"
                />
              </WrapItem>
            </Wrap>
            <Box>
              <RouteLink href={`/`}>
                <Link pos={`relative`}>
                  <Image
                    src={
                      colorMode === 'light'
                        ? '/logo-light-mode.png'
                        : '/logo-dark-mode.png'
                    }
                    width={150}
                  />
                  {router.pathname === '/' && (
                    <VisuallyHidden>
                      <Heading
                        as={`h1`}
                        pos={`absolute`}
                        top={`50%`}
                        left={`50%`}
                        style={{
                          transform: `translate(-50%, -50%)`,
                          fontSize: `1px`,
                          width: 0,
                          height: 0,
                        }}
                      >
                        Yeah1 Media - Trang tin tức tổng hợp
                      </Heading>
                    </VisuallyHidden>
                  )}
                </Link>
              </RouteLink>
            </Box>
            <HStack spacing={2} alignItems={`center`}>
              <IconButton
                colorScheme="gray"
                aria-label="Search"
                icon={colorMode === 'light' ? <VscColorMode /> : <CgDarkMode />}
                variant={`ghost`}
                isRound={true}
                fontSize="24px"
                onClick={toggleColorMode}
              />
              <IconButton
                colorScheme="gray"
                aria-label="Search"
                icon={showSearch ? <IoCloseOutline /> : <IoSearch />}
                variant={showSearch ? 'solid' : `ghost`}
                isRound={true}
                fontSize="24px"
                onClick={_toggleSearchBar}
              />
            </HStack>
          </Stack>
          <Collapse in={isShowMobileMenu} animateOpacity>
            <Stack
              direction={`row`}
              justify={isSticky ? 'space-between' : 'center'}
              className={isShowMobileMenu ? 'mobile-menu' : ''}
              id={`menu-wrap`}
            >
              <Wrap
                spacing={0}
                justify={{
                  md: `center`,
                  base: `flex-start`,
                }}
                as={`nav`}
                id={`header-bottom`}
                pt={{
                  md: 0,
                  base: 4,
                }}
              >
                {menuLists.map((menu) => (
                  <WrapItem
                    width={{
                      md: `auto`,
                      base: `50%`,
                    }}
                    key={`${menu.id}`}
                  >
                    <NavLink
                      href={`/category/${menu.slug}`}
                      isActive={router.asPath === `/category/${menu.slug}`}
                    >
                      <Box d={`inline-flex`} alignItems={`center`}>
                        <Box as={`span`} mr={2}>
                          {menu.icon}
                        </Box>

                        {menu.title}
                      </Box>
                    </NavLink>
                  </WrapItem>
                ))}
              </Wrap>
              <Box id={`sticky-actions`}>
                <HStack spacing={2} alignItems={`center`}>
                  <IconButton
                    colorScheme="gray"
                    aria-label="Search"
                    icon={
                      colorMode === 'light' ? <VscColorMode /> : <CgDarkMode />
                    }
                    variant={`ghost`}
                    isRound={true}
                    fontSize="24px"
                    onClick={toggleColorMode}
                  />
                  <IconButton
                    colorScheme="gray"
                    aria-label="Search"
                    icon={showSearch ? <IoCloseOutline /> : <IoSearch />}
                    variant={showSearch ? 'solid' : `ghost`}
                    isRound={true}
                    fontSize="24px"
                    onClick={_toggleSearchBar}
                  />
                </HStack>
              </Box>
            </Stack>
          </Collapse>
        </Container>
      </Box>
      <Box pos={`absolute`} top={`100%`} left={0} width={`100%`}>
        <Collapse in={showSearch} animateOpacity>
          <Box
            bgColor={colorMode === 'light' ? `gray.100` : `gray.700`}
            py={4}
            textAlign={`center`}
            mt={`4px`}
          >
            <SearchStyle>
              <Input
                placeholder="Search"
                size="lg"
                variant="outline"
                bgColor={colorMode === 'light' ? `white` : `gray.600`}
                pr={24}
                _focus={{
                  outline: 0,
                }}
              />
              <Button
                variant={`outline`}
                colorScheme={`brand`}
                pos={`absolute`}
                top={2}
                right={2}
                id={`search-btn`}
                size={`sm`}
                borderWidth={2}
              >
                Tìm kiếm
              </Button>
            </SearchStyle>
          </Box>
        </Collapse>
      </Box>
    </Styled>
  );
};

export default Header;
