import { Client } from "@notionhq/client";

const dbClient = new Client({
    auth: process.env.NOTION_TOKEN,
})

const dbID = process.env.NOTION_DATABASE_ID;

export {
    dbClient,
    dbID
}
