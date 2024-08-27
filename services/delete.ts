import { getCookie } from "@/utils/cookieHandler";
import { useState } from "react";
export const useDelete = (url: string) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const deleteEntry = async () => {
        setIsLoading(true);
        const token = getCookie("token");

        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            setData(result);
            setIsDeleted(true);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, error, isLoading, isDeleted, deleteEntry };
}