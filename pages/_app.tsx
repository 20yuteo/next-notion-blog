import '../styles/globals.css'
import 'react-notion-x/src/styles.css'
import 'prismjs/themes/prism-tomorrow.css'
import 'katex/dist/katex.min.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Header } from "../src/components/Header";
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Head>
        <title>カオスなブログ🍔</title>
        <meta name="description" content="リバ邸カオスが運営するブログサイトです。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/emoji_u1f354.png" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
