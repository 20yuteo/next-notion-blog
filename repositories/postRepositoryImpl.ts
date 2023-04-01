import { Client } from "@notionhq/client";
import { dbID } from "../config/db";
import { PostRepository } from "../domain/postRepository";

export class PostRepositoryImpl implements PostRepository {
    private client: Client;
    constructor(client: Client) {
        this.client = client;
    }

    async findAll() {
        return this.client.databases.query({
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
    }
}