const express = require("express");
const axios = require("axios");
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3010;
const key = 'G0hqHXiN';

app.get('/search', async (req, res) => {
    const path = req.originalUrl.replace('/search?', '?').replace(/%20/g, '+');
    const target = `https://www.rijksmuseum.nl/api/en/collection` + path;
    return await handleRequest(req, res, target, {key});
})

app.get('/terms', async (req, res) => {
    const {query} = req;
    const target = 'https://www.rijksmuseum.nl/en/search/advanced/terms';
    return await handleRequest(req, res, target, query);
})
app.get('/collection/:id', async (req, res) => {
    const target = 'https://www.rijksmuseum.nl/api/en/collection/' + req.params.id;
    return await handleRequest(req, res, target, {key});
})

async function handleRequest(req, res, target, params) {
    const {originalUrl} = req;
    let result, status, targetUrl;
    try {
        const response = await axios.get(target, {params});
        targetUrl = axios.getUri(response.config);
        result = response.data;
        status = response.status;
    } catch (e) {
        status = e.response.status;
        result = {
            ...e.response.data,
            extra: {
                error: e,
                resHeaders: e.response.headers,
            },
        };
    }
    console.log(`\nHandling Request: ----------------------------------`);
    console.log(`\x1b[33m ${req.method} \x1b[0m` + ` Path:   ` + originalUrl);
    console.log(`\x1b[33m     \x1b[0m` + ' Source: ' + originalUrl.replace(req.path, '').split('&').join(' '));
    console.log(`\x1b[33m     \x1b[0m` + ' Target: ' + (new URL(targetUrl).search).split('&').join(' '));
    console.log(`\x1b[33m ${status} \x1b[0m` + ' Final:  ' + targetUrl);
    return res.status(status).json(result);
}

app.listen(port, () => console.log(`Listening on ${port}`));
