export default {
  // Styles for the base style
  baseStyle: {
    _focus: {
      boxShadow: 'none',
    },
  },
  // Styles for the size variations
  sizes: {},
  // Styles for the visual style variations
  variants: {
    solid() {
      return {
        bg: 'red.500',
        _focus: {
          boxShadow: `none`,
        },
      };
    },
  },
  // The default `size` or `variant` values
  defaultProps: {},
};
