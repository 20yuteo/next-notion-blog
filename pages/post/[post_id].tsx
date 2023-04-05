import { Container, SkeletonText, Spinner, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ExtendedRecordMap } from 'notion-types';
import { useEffect, useState } from "react";
import { NotionRenderer } from 'react-notion-x';
import { endpoint } from "../../config/endpoint";

const Post = () => {
    const router = useRouter();
    const [recordMap, setRecordMap] = useState<ExtendedRecordMap>();
    const { colorMode } = useColorMode();

    useEffect(() => {
        const postID = router.query.post_id;

        (async () => {
            if (!postID) {
                return;
            }
            const res = await fetch(`${endpoint}/api/post/${postID}`);
            const data = await res.json();

            if (!data.recordMap) {
                return;
            }

            setRecordMap(data.recordMap);
        })();
    }, [router.query]);

    return (
        <>
            {recordMap ? (
                <Container maxW='container.md'>
                    <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={colorMode === "dark"} />
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