import {
    Box, Button, Container, Flex, Heading,
    useColorMode,
    useColorModeValue, useMediaQuery
} from '@chakra-ui/react';
import NextLink from "next/link";
import { FC } from 'react';
// import { FaTwitter } from "react-icons/fa";

export const Header: FC<{ flexGrow: number }> = (props: { flexGrow: number }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const [isLargerThen425] = useMediaQuery("(min-width: 425px)");
    return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} flexGrow={props.flexGrow} maxH={"80px"}>
            <Container maxW="container.lg">
                <Flex as="header" py="4" justifyContent="space-between" alignItems="center">
                    <NextLink href="/" passHref>
                        <Heading as='h1' fontSize="lg" cursor="pointer" color={useColorModeValue('gray.600', 'white')}>
                            🍔カオスなブログ
                        </Heading>
                    </NextLink>
                    <Box>
                        {/* {isLargerThen425 && (
                            <>
                                <NextLink href={'https://twitter.com/livertychaos'}>
                                    <Button colorScheme='twitter' width={"5px"} leftIcon={<FaTwitter />} iconSpacing={"0"} borderRadius={"50px"} marginRight={10} />
                                </NextLink>
                            </>
                        )} */}
                        <Button size='lg' onClick={toggleColorMode}>
                            {colorMode === 'light' ? <>🌜</> : <>🌞</>}
                        </Button>
                    </Box>
                </Flex>
            </Container>
        </Box>
    );
}