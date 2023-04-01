import { Client } from "@notionhq/client";
import { dbClient } from "../config/db";
import { PostRepositoryImpl } from "./postRepositoryImpl";

export class RepositoryClient {
    private static dbClient: Client;
    private static postRepository: PostRepositoryImpl;

    constructor() {
        RepositoryClient.dbClient = dbClient;
        RepositoryClient.postRepository = new PostRepositoryImpl(RepositoryClient.dbClient);
    }

    static postReposity() {
        return RepositoryClient.postRepository;
    }
}