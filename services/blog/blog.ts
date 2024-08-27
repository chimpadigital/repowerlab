import { getCookie } from '@/utils/cookieHandler';
import { useState, useEffect } from 'react';
import { EntryData, PostEntryHook } from './Blog.interfaces';

interface Response {
  data: any[]
}

export const useGetBlogEntries = (url: string) => {
  const [data, setData] = useState<Response>({
    data:[]
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getCookie("token")
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
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
    fetchData();

  }, [url]);

  return { data, error, isLoading };
};



export const usePostEntry = (url: string): PostEntryHook => {
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


    myHeaders.append("Authorization",`Bearer ${token}`)
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
    }
  };

  return { data, error, isLoading, postEntry };
};

