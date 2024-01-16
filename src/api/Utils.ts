export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const prepareHeaders = (headers: any) => {
    const token = localStorage.getItem('lw-token');
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
};

