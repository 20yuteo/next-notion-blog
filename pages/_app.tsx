import '../styles/globals.css'
import 'react-notion-x/src/styles.css'
import 'prismjs/themes/prism-tomorrow.css'
import 'katex/dist/katex.min.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Header } from "../src/components/Header";
import Head from 'next/head'
import CustomHead from '../src/components/CustomHead'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <CustomHead />
      <Header />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
