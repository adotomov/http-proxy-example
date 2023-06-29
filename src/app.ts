import express, { Express, Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import fs from 'fs';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const accessLog = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

app.use(morgan(":method :url :status :res[content-length] - :response-time ms", { stream: accessLog }))

app.use('/articles/views', createProxyMiddleware({
  target: `${process.env.BASE_URL}`,
  onProxyReq: (proxyReq, req, res) => {
    const { period } = req.query
    const newPath = proxyReq.path.split('?')[0]
    proxyReq.path = `${newPath}/${period}.json?api-key=${process.env.API_KEY}`
  },
  changeOrigin: true,
  pathRewrite: { '^/articles/views': '' }
}))

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Running at http://localhost:${port}`))
}

module.exports = app;
