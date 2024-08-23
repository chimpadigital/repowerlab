export const setTokenCookie = (token: string) => {
    const maxAge = 3600; // Tiempo de vida en segundos (ej. 1 hora)
    document.cookie = `token=${token}; path=/; max-age=${maxAge}; SameSite=Strict; Secure;`;
};

// Función para obtener el valor de una cookie específica
export const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
};

export const deleteTokenCookie = () => {
    document.cookie = 'token=; path=/; max-age=0; SameSite=Strict; Secure;';
};