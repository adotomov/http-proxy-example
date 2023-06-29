"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const fs_1 = __importDefault(require("fs"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const accessLog = fs_1.default.createWriteStream(path_1.default.join(__dirname, 'access.log'), { flags: 'a' });
app.use((0, morgan_1.default)(":method :url :status :res[content-length] - :response-time ms", { stream: accessLog }));
app.use('/articles/views', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: `${process.env.BASE_URL}`,
    onProxyReq: (proxyReq, req, res) => {
        const { period } = req.query;
        const newPath = proxyReq.path.split('?')[0];
        proxyReq.path = `${newPath}/${period}.json?api-key=${process.env.API_KEY}`;
    },
    changeOrigin: true,
    pathRewrite: { '^/articles/views': '' }
}));
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => console.log(`Running at http://localhost:${port}`));
}
module.exports = app;
