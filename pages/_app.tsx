import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import React from 'react'

const breakpoints = {
  xs: '0',
  sm: '600px',
  md: '800px',
  lg: '1000px',
  xl: '1280px'
}

const theme = extendTheme({ breakpoints })

const MyApp = ({ Component, pageProps }: AppProps) => ( 
  <ChakraProvider>
    <RecoilRoot> 
      <React.Suspense fallback={<div>Loading...</div>}> 
        <Component {...pageProps} /> 
      </React.Suspense> 
    </RecoilRoot> 
  </ChakraProvider>
)

export default MyApp


