import getConfig from 'next/config';
import axios from 'axios';

const { publicRuntimeConfig: { serverUrl } } = getConfig();

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.body = {};
    }

    try {
        const response = await axios.post(`${serverUrl}/nest-api/comments`, req.body, {
            headers: {
                cookie: req.headers.cookie
            }
        });
        res.status(response.status).json(response.data);
    } catch (e) {
        res.status(e.response?.status ?? 500).json(e.response?.data ?? { message: 'Internal Server Error' })
    }

}
