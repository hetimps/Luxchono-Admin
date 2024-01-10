export const BASE_URL = ' http://192.168.29.78:5757';

export const prepareHeaders = (headers: any) => {
    const token = localStorage.getItem('lw-token');
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
};





