import getConfig from 'next/config';

const { publicRuntimeConfig: { serverUrl } } = getConfig();

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.body = {};
    }

    res.redirect(`${serverUrl}/admin`);
}
