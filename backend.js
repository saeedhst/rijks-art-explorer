const express = require("express");
const axios = require("axios");
const cors = require('cors');

const app = express();
app.use(cors());

const port = process.env.PORT || 3010;
const key = 'G0hqHXiN';
const baseURL = "https://www.rijksmuseum.nl";
const cache = {};

axios.defaults.baseURL = baseURL;

app.get('*', async (req, res) => {
  try {
    const cacheKey = req.originalUrl;
    const targetUrl = req.originalUrl.replace(/%20/g, '+');
    if (cache[cacheKey] && cache[cacheKey].expires >= Date.now()) {
      const response = cache[cacheKey].data;
      console.log('\x1b[36m Returning cached result for\x1b[0m ' + cacheKey);
      return res.status(response.status).json(response.data);
    }
    const response = await axios.get(targetUrl, {params: {key}});
    cache[cacheKey] = {
      data: response,
      expires: Date.now() + 60 * 60 * 1000,
    }
    console.log('\x1b[33m Relaying request to: \x1b[0m ' + axios.getUri(response.config));
    return res.status(response.status).json(response.data);
  } catch (e) {
    const status = e?.response?.status || 500;
    const result = {
      ...e?.response?.data,
      extra: {
        error: e,
        resHeaders: e?.response?.headers,
      },
    };
    return res.status(status).json(result);
  }
});

app.listen(port, () => console.log(`Listening on 3010...`));
