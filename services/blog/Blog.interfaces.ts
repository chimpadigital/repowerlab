export interface EntryData {
    content: string;
    author?: string;
    title: string;
    category: string;
    lang?: 'esp' | 'eng';
    is_published?: boolean;
    images?: File[];
}

export interface PostEntryHook {
    data: any;
    error: string | null;
    isLoading: boolean;
    postEntry: (entryData: EntryData) => Promise<void>;
}