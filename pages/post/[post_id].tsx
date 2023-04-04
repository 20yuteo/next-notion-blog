import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ExtendedRecordMap } from 'notion-types';
import { NotionRenderer } from 'react-notion-x'
import { Header } from "../../src/components/Header";
import { useColorMode } from "@chakra-ui/react";
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
            <Header />
            {recordMap && <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={colorMode === "dark"} />}
        </>
    )
}
export default Post;