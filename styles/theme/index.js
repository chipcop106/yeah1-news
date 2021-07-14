import { extendTheme } from '@chakra-ui/react';
import colors from '@/styles/theme/colors';
import Button from '@/styles/theme/components';
import IconButton from '@/styles/theme/components';
import global from '@/styles/theme/globalStyles';
// 2. Extend the theme to include custom colors, fonts, etc

const configs = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  configs,
  colors,
  styles: {
    global,
  },
  fonts: {
    body: "'Roboto', sans-serif",
    heading: "'Arial', sans-serif",
    mono: 'monospace',
  },
  components: {
    Button,
    IconButton,
    Link: {
      baseStyle: {
        _hover: {
          textDecoration: 'none',
          color: `brand.500`,
        },
      },
    },
  },
});

export default theme;
