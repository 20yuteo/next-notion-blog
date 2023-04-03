import { Box, Card, CardBody, CardHeader, Heading, Stack, StackDivider, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { IPost } from "../domain/Post";
import { Header } from "../src/components/Header";

const Posts = () => {
    const [posts, setPosts] = useState<IPost[]>([]);

    useEffect(() => {
        (async () => {
            const res = await axios.get("http://localhost:3000/api/posts");
            setPosts(JSON.parse(res.data.body).map((post: IPost) => {
                return {
                    id: post.id,
                    title: post.title,
                    createdAt: post.createdAt
                }
            }))
        })();
    }, [])

    return (
        <div>
            <Header />
            <Card>
                <CardHeader>
                    <Heading size='md'>記事一覧</Heading>
                </CardHeader>
                <CardBody>
                    <Stack divider={<StackDivider />} spacing='4'>
                        {posts.map((post, index) => {
                            return (
                                <Box key={index}>
                                    <Heading size='xs' textTransform='uppercase'>
                                        {post.title}
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        投稿日: {post.createdAt.toString()}
                                    </Text>
                                </Box>
                            );
                        })}
                    </Stack>
                </CardBody>
            </Card>
        </div>
    )
}

export default Posts;