import { NotionBlock, Render, withContentValidation } from '@9gustin/react-notion-render';
import { Box, Container, Heading, SkeletonText, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { endpoint } from "../../config/endpoint";

const MyHeading = (props: { plainText: ReactNode }) => <Heading className="my-h1-class" marginTop={"30px"}>{props.plainText}</Heading>


const MyParagraph = (props: { plainText: ReactNode }) => {
    return (
        <>
            <Box marginTop={"10px"} marginBottom={"10px"} >{props.plainText}</Box>
        </>
    )
}

const Post = () => {
    const router = useRouter();
    const [block, setBlock] = useState<(NotionBlock)[]>([]);
    const { colorMode } = useColorMode();

    const pageTitle = router.query.title as string;
    useEffect(() => {
        const postID = router.query.post_id;

        (async () => {
            if (!postID) {
                return;
            }
            const res = await fetch(`${endpoint}/api/post/${postID}`);
            const data = await res.json();

            if (!data.body) {
                return;
            }

            setBlock(data.body.map((context: any) => context));
        })();
    }, [router.query]);

    return (
        <>
            {block.length > 0 ? (
                <Container maxW='container.md' flexGrow={1}>
                    {
                        <Render blocks={block} blockComponentsMapper={{
                            heading_1: withContentValidation(MyHeading),
                            paragraph: withContentValidation(MyParagraph)
                        }} />
                    }
                </Container>
            ) :
                <Container maxW='container.md'>
                    <SkeletonText mt='14' noOfLines={22} spacing='4' skeletonHeight='4' />
                </Container>
            }
        </>
    )
}
export default Post;