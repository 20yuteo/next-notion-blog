import type { NextApiRequest, NextApiResponse } from 'next'
import { dbClient } from '../../config/db'
import { PostRepository } from '../../repositories/postRepository';

const postRepository = new PostRepository(dbClient);

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const result = await postRepository.findAll();

    res.status(200).json({ body: JSON.stringify(result) });
}

export default handler;