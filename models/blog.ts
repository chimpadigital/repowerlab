export interface BlogI {
    id: string | number
    title: string
    created_at: string
    published_at: string
    is_published: boolean
    lang?: "esp" | "eng"
}
