import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider, ColorModeProvider } from '@chakra-ui/react';
import '@testing-library/jest-dom';
import theme from '@/styles/theme';

const ChakraRenderer: FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider
        options={{
          initialColorMode: theme.config.initialColorMode,
        }}
      >
        {children}
      </ColorModeProvider>
    </ThemeProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) => render(ui, { wrapper: ChakraRenderer, ...options });

export * from '@testing-library/react';
export { customRender as render };
