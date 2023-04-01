export interface PostRepository {
    findAll(): Promise<any>
}