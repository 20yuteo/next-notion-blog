import { ChakraProvider, extendTheme, Flex } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import 'prismjs/themes/prism-tomorrow.css'
import CustomHead from '../src/components/CustomHead'
import Footer from '../src/components/Footer'
import Header from "../src/components/Header"
import '../styles/globals.css'
import GAScript from '../src/components/GAScript'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { pageview } from '../config/gtag'

const Theme = extendTheme({
  styles: {
    global: {
      "html, body, div#__next, div.css-j7qwjs": {
        height: "100%"
      }
    },
  }
});

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter();
  useEffect(() => {
    const handleRouterChange = (url: string) => {
      pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouterChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouterChange);
    };
  }, [router.events]);

  return (
    <ChakraProvider theme={Theme}>
      <GAScript />
      <CustomHead />
      <Flex flexDirection={"column"}>
        <Header flexGrow={1} />
        <Component {...pageProps} height={"100%"} />
        <Footer />
      </Flex>
    </ChakraProvider>
  )
}
