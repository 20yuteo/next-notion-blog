import type { NextApiRequest, NextApiResponse } from 'next'
import { dbClient } from '../../../config/db'
import { PostRepository } from '../../../repositories/postRepository';

const postRepository = new PostRepository(dbClient);

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { postID } = req.query;
    const { body } = await postRepository.find(postID as string);

    res.status(200).json({ body });
}

export default handler;