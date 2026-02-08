const getBaseUrl = () => {
    if (typeof window !== 'undefined') return '/api';
    if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
    return `http://localhost:${process.env.PORT || 3000}/api`;
};

export const API_BASE_URL = getBaseUrl();
