import { getCookie } from '@/utils/cookieHandler';
import { useState, useEffect } from 'react';
import { EntryData, PostEntryHook, PutEntryHook } from './Blog.interfaces';
import { useRouter } from "next/navigation";


interface Response {
  data: any[]
}

interface Response {
  data: any[];
}

interface FetchParams {
  sort?: string; // "category,-title"
  filter?: { [key: string]: string }; // { title: "Casa", category: "Compradores", lang: "esp" }
}

export const useGetBlogEntries = (url: string, initialParams?: FetchParams) => {
  const [data, setData] = useState<Response>({ data: [] });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [params, setParams] = useState<FetchParams | undefined>(initialParams);

  const buildUrlWithParams = (url: string, params?: FetchParams) => {
    const urlObj = new URL(process.env.NEXT_PUBLIC_API_URL + url);

    if (params?.sort) {
      urlObj.searchParams.append('sort', params.sort);
    }

    if (params?.filter) {
      Object.keys(params.filter).forEach((key) => {
        if(params.filter) urlObj.searchParams.append(`filter[${key}]`, params.filter[key]);
      });
    }

    return urlObj.toString();
  };

  const fetchData = async (overrideParams?: FetchParams) => {
    const token = getCookie("token");
    setIsLoading(true);

    try {
      const finalParams = overrideParams ? { ...params, ...overrideParams } : params;
      const fullUrl = buildUrlWithParams(url, finalParams);
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add Bearer token here
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setData(result);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, params]);

  const refetch = (newParams?: FetchParams) => {
    setParams((prevParams) => ({ ...prevParams, ...newParams }));
    fetchData(newParams);
  };

  return { data, error, isLoading, refetch };
};



export const usePutEntry = (url: string): PutEntryHook => {
  const router = useRouter()

  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const putEntry = async (entryData: EntryData) => {
    setIsLoading(true);
    const token = getCookie("token")
    const formData = new FormData();
    const myHeaders = new Headers()

    formData.append('content', entryData.content);
    if (entryData.author) formData.append('author', entryData.author);
    formData.append('title', entryData.title);
    // formData.append('category', entryData.category);
    formData.append('lang', entryData.lang || 'esp'); // Default value is 'esp'
    formData.append('is_published', String(entryData.is_published || 0));


    myHeaders.append("Authorization", `Bearer ${token}`)
    myHeaders.append("Accept", "application/json")

    if (entryData.images) {
      entryData.images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
    }

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
        method: 'PUT',
        headers: myHeaders,
        mode: "cors",
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setData(result);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
      router.push("/blog")
    }
  };

  return { data, error, isLoading, putEntry };
};
export const usePostEntry = (url: string): PostEntryHook => {
  const router = useRouter()

  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const postEntry = async (entryData: EntryData) => {
    setIsLoading(true);
    const token = getCookie("token")
    const formData = new FormData();
    const myHeaders = new Headers()

    formData.append('content', entryData.content);
    if (entryData.author) formData.append('author', entryData.author);
    formData.append('title', entryData.title);
    // formData.append('category', entryData.category);
    formData.append('lang', entryData.lang || 'esp'); // Default value is 'esp'
    formData.append('is_published', String(entryData.is_published || 0));


    myHeaders.append("Authorization", `Bearer ${token}`)
    myHeaders.append("Accept", "application/json")

    if (entryData.images) {
      entryData.images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
    }

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
        method: 'POST',
        headers: myHeaders,
        mode: "cors",
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setData(result);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
      router.push("/blog")
    }
  };

  return { data, error, isLoading, postEntry };
};

