export interface BlogI {
    id: string | number
    title: string
    created_at: string
    published_at: string
    status: BlogStatusT
}

export type BlogStatusT = "draft" | "published" | "paused"