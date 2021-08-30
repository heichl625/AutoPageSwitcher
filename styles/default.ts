// my-theme.ts
import { DefaultTheme } from 'styled-components';

const myTheme: DefaultTheme = {
  borderRadius: '5px',

  colors: {
    main: '#1E1E1E',
    secondary: '#FFFFFF',
    separator: '#E9E9E9',
    highlighted: '#2EBF63',
    hint: '#808e9b',
    error: '#ff3f34',
    darkTransparentBackground: 'rgba(30, 30, 30, 0.4)',
  },

  fontSize: {
      navigationItem: '0.875rem',
      sectionTitle: '2.25rem',
      titleDescription: '1.25rem',
      description: '0.875rem',
  },

  fontWeight: {
    regular: 400,
    medium: 500,
}
};

export { myTheme };