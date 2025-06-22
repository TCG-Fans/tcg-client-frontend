import ky from 'ky';

const REQUEST_API_URL = import.meta.env.VITE_TCG_API;

const REQUEST_TIMEOUT = 15000

export const api = ky.create({
    prefixUrl: REQUEST_API_URL,
    timeout: REQUEST_TIMEOUT,
    hooks: {
        beforeRequest: [
            (request) => {
                const token = localStorage.getItem('token');

                if (token) {
                    request.headers.set('Authorization', `Bearer ${token}`);
                }
            },
        ],
    },
});
