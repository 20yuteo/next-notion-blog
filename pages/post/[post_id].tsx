import { NotionBlock, Render, withContentValidation } from '@9gustin/react-notion-render';
import { Box, Container, Heading, SkeletonText, useColorMode, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { endpoint } from "../../config/endpoint";
import { useWindowSize } from '../../hooks/useWindowSize';
import CustomHead from '../../src/components/CustomHead';

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
    const toast = useToast();
    const [width] = useWindowSize();

    const pageTitle = router.query.title as string;
    useEffect(() => {
        const postID = router.query.post_id;

        (async () => {
            if (!postID) {
                return;
            }

            try {
                const res = await fetch(`${endpoint}/api/post/${postID}`);
                const data = await res.json();

                if (!data.body) {
                    console.log("not found 2")
                    toast({
                        title: 'Page Not Found.',
                        description: "ページが見つかりません。",
                        status: 'error',
                        duration: 10000,
                        isClosable: true,
                    });
                    return;
                }

                setBlock(data.body.map((context: any) => context));
            } catch (e: any) {
                toast({
                    title: 'Server Error.',
                    description: "サーバーでエラーが発生しました。",
                    status: 'error',
                    duration: 10000,
                    isClosable: true,
                });
                return;
            }
        })();
    }, [router.query, toast]);

    return (
        <>
            <CustomHead title={pageTitle} content={pageTitle} />
            {block.length > 0 ? (
                <Container maxW='container.md' flexGrow={1}>
                    <Heading fontSize={"5xl"}>
                        {pageTitle}
                    </Heading>
                    {
                        <Render blocks={block} blockComponentsMapper={{
                            heading_1: withContentValidation(MyHeading),
                            paragraph: withContentValidation(MyParagraph)
                        }} />
                    }
                </Container>
            ) :
                <Container maxW='container.md'>
                    <SkeletonText mt='14' noOfLines={width < 426 ? 15 : 18} spacing='4' skeletonHeight='4' />
                </Container>
            }
        </>
    )
}
export default Post;