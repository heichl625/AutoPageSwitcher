// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;

    colors: {
      main: string;
      secondary: string;
      separator: string;
      highlighted: string;
      hint: string,
      error: string,
      darkTransparentBackground: string
    };

    fontSize: {
      navigationItem: string;
      sectionTitle: string;
      titleDescription: string;
      description: string;
    },

    fontWeight: {
        regular: 400;
        medium: 500;
    }
  }
}