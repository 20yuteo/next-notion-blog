import { Container, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ExtendedRecordMap } from 'notion-types';
import { useEffect, useState } from "react";
import { NotionRenderer } from 'react-notion-x';
import { endpoint } from "../../config/endpoint";
import CustomHead from "../../src/components/CustomHead";

const Post = () => {
    const router = useRouter();
    const [recordMap, setRecordMap] = useState<ExtendedRecordMap>();
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

            if (!data.recordMap) {
                return;
            }

            setRecordMap(data.recordMap);
        })();
    }, [router.query]);

    return (
        <>
            {recordMap && (
                <>
                    <CustomHead title={pageTitle} content={pageTitle} />
                    <Container maxW='container.md'>
                        <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={colorMode === "dark"} />
                    </Container>
                </>
            )}
        </>
    )
}
export default Post;