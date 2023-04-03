import { Box, Card, CardBody, CardHeader, Container, Heading, Stack, StackDivider, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
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
            <VStack>
                <Container maxW='container.md'>
                    <Heading size='md' margin={10}>記事一覧</Heading>
                    {
                        posts.map((post, index) => {
                            return (
                                <Card maxW={1024} marginBottom={8} key={index}>
                                    <CardBody>
                                        <Box>
                                            <Link href={`post/${post.id}`}>
                                                <Heading size='xs' textTransform='uppercase'>
                                                    {post.title}
                                                </Heading>
                                                <Text pt='2' fontSize='sm'>
                                                    投稿日: {post.createdAt.toString()}
                                                </Text>
                                            </Link>
                                        </Box>
                                    </CardBody>
                                </Card>
                            );
                        })
                    }
                </Container>
            </VStack>
        </div>
    )
}

export default Posts;