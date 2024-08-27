export interface EntryData {
    content: string;
    author?: string;
    title: string;
    category: string;
    lang?: 'esp' | 'eng';
    is_published?: number;
    images?: File[];
}

export interface PostEntryHook {
    data: any;
    error: string | null;
    isLoading: boolean;
    postEntry: (entryData: EntryData) => Promise<void>;
}