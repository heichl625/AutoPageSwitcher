import '../styles/globals.css'
import { ThemeProvider } from 'styled-components'
import type { AppProps } from 'next/app'
import { myTheme } from 'styles/default'
import { MainWrapper } from '../styles/styledMain'

import NavigationBar from 'components/navigation-bar'
import { Provider } from 'react-redux'
import { store } from 'redux/store'
import Auth from 'components/auth';

function MyApp({ Component, pageProps }: AppProps) {

  

  return <ThemeProvider theme={myTheme}>
    <Provider store={store}>
      <Auth />
      <NavigationBar />
      <MainWrapper>
        <Component {...pageProps} />
      </MainWrapper>
    </Provider>
  </ThemeProvider>
}
export default MyApp
