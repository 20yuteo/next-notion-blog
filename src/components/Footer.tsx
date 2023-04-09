import {
    Box, Button, Container, Flex, Heading, useMediaQuery
} from '@chakra-ui/react';
import NextLink from "next/link";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
    const [isSmallerThen425] = useMediaQuery("(max-width: 425px)");
    return (
        <>
            {isSmallerThen425 && (<Box px={4} position={"sticky"} left={0} bottom={0} flexGrow={1} maxH={"80px"}>
                <Container maxW="container.lg">
                    <Flex as="header" py="4" justifyContent="space-between" alignItems="center">
                        <NextLink href={'/'}>
                            <Heading size={"2xl"}>
                                🍔
                            </Heading>
                        </NextLink>
                        <NextLink href={'https://twitter.com/livertychaos'}>
                            <Button colorScheme='twitter' width={"5px"} leftIcon={<FaTwitter />} iconSpacing={"0"} borderRadius={"50px"} />
                        </NextLink>
                        {/* <Button color={"brown"} width={"5px"} borderRadius={"50px"} >
                            ☕️
                        </Button> */}
                    </Flex>
                </Container>
            </Box>)}
        </>
    );
}

export default Footer;