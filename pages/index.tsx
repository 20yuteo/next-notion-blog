import { Box, Card, CardBody, Container, Flex, Heading, Link, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { endpoint } from '../config/endpoint';
import { IPost } from '../domain/Post';

export default function Home() {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get(`${endpoint}/api/posts`);
      setPosts(JSON.parse(res.data.body).map((post: IPost) => {
        return {
          id: post.id,
          title: post.title,
          createdAt: dayjs(post.createdAt).format("YYYY/MM/DD")
        }
      }))
    })();
  }, [])

  return (
    <>
      <VStack>
        <Container maxW='container.md'>
          <Heading size='md' margin={10}>記事一覧</Heading>
          {
            posts.map((post, index) => {
              return (
                <Card maxW={1024} marginBottom={8} key={index}>
                  <CardBody>
                    <Box>
                      <Link href={`post/${post.id}?title=${post.title}`}>
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
    </>
  )
}
