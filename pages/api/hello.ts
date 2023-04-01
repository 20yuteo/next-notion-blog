// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from "@notionhq/client";
import { RepositoryClient } from '../../repositories/repositoryClient';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const dbID = process.env.NOTION_DATABASE_ID;

type Data = {
  name: string
}

const postRepository = RepositoryClient.postReposity();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const result = await postRepository.findAll();

  res.status(200).json({ name: JSON.stringify(result) });
}
