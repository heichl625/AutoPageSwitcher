import '../styles/globals.css'
import { ThemeProvider } from 'styled-components'
import type { AppProps } from 'next/app'
import { myTheme } from 'styles/default'
import { MainWrapper } from '../styles/styledMain'

import NavigationBar from 'components/navigation-bar'

function MyApp({ Component, pageProps }: AppProps) {
  return <ThemeProvider theme={myTheme}>
    <NavigationBar/>
    <MainWrapper>
      <Component {...pageProps} />
    </MainWrapper>
  </ThemeProvider>
}
export default MyApp
