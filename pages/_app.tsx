import { ChakraProvider, Flex } from '@chakra-ui/react'
import 'katex/dist/katex.min.css'
import type { AppProps } from 'next/app'
import 'prismjs/themes/prism-tomorrow.css'
import 'react-notion-x/src/styles.css'
import CustomHead from '../src/components/CustomHead'
import { Footer } from '../src/components/Footer'
import { Header } from "../src/components/Header"
import '../styles/globals.css'
import { theme } from "./Theme"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <CustomHead />
      <Flex flexDirection={"column"}>
        <Header flexGrow={1} />
        <Component {...pageProps} height={"100%"} />
        <Footer />
      </Flex>
    </ChakraProvider>
  )
}
