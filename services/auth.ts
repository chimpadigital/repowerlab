export interface LoginResponse {
    token: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed!');
        }

        const data: LoginResponse = await response.json();
        localStorage.setItem('token', data.token);
        return data;
    } catch (error) {
        throw error;
    }
};

export const getUserData = async <T>(): Promise<T> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No token found');
    }

    const response = await fetch('/api/user', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }

    const data: T = await response.json();
    return data;
};