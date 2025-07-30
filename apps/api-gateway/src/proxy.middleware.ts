import { Injectable, NestMiddleware } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { proxyTable } from './constants/proxy';

@Injectable()
export class ProxyMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const matchedRoute = Object.keys(proxyTable).find((prefix) =>
      req.url.startsWith(prefix),
    );

    if (!matchedRoute) return next();

    // Ensure the proxy is mounted on the matched path
    const middleware = createProxyMiddleware({
      target: proxyTable[matchedRoute],
      changeOrigin: true,
      // No need for pathRewrite in v3
      // on: {
      //   proxyReq: (proxyReq, req) => {
      //     console.log(
      //       `[PROXY] ${req.method} ${req.url} → ${proxyReq.getHeader('host')}${proxyReq.path}`,
      //     );
      //   },
      //   proxyRes: (proxyRes, req) => {
      //     console.log(
      //       `[PROXY RES] ${req.method} ${req.url} → ${proxyRes.statusCode}`,
      //     );
      //   },
      // },
    });

    // Manually extract the proxy path segment
    return middleware(req, res, next);
  }
}
