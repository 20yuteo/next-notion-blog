import { Container, SkeletonText, useColorMode } from "@chakra-ui/react";
import { BlockObjectResponse, PartialBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { useRouter } from "next/router";
import { ExtendedRecordMap } from 'notion-types';
import { useEffect, useState } from "react";
import { NotionBlock, Render } from '@9gustin/react-notion-render'
import { endpoint } from "../../config/endpoint";

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
                <Container maxW='container.md'>
                    {
                        <Render blocks={block} />
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