import { Client } from "@notionhq/client";
import { dbID } from "../config/db";
import { IPost } from "../domain/Post"
import { NotionAPI } from 'notion-client';

export class PostRepository {
    private client: Client;
    constructor(client: Client) {
        this.client = client;
    }

    async findAll(): Promise<(IPost | undefined)[]> {
        const res = await this.client.databases.query({
            database_id: dbID || '',
            filter: {
                or: [
                    {
                        property: 'published',
                        checkbox: {
                            equals: true,
                        },
                    },
                ]
            },
            sorts: [
                {
                    property: 'date',
                    direction: 'descending',
                },
            ]
        });

        return res.results.map((res => {
            // TODO: properties非推奨になったため暫定対応
            if ("properties" in res) {
                if ("title" in res.properties.title) {
                    return {
                        id: res.id,
                        title: res.properties.title.title[0].plain_text,
                        createdAt: new Date(res.created_time)
                    }
                }
            }
        }))
    }

    async find(postID: string) {
        // const res = await this.client.blocks.children.list({
        //     block_id: postID
        // })

        // return {
        //     id: postID,
        //     body: res
        // }
        const notion = new NotionAPI();

        const recordMap = await notion.getPage(postID);
        return {
            recordMap
        }
    }
}