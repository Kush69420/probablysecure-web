import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createReadStream } from 'node:fs';
import type { Connect, Plugin } from 'vite';

// /resume is a PDF response in development, preview, and production (Nginx).
const resumeEndpoint = (): Plugin => {
  const middleware: Connect.NextHandleFunction = (req, res, next) => {
    const path = req.url?.split('?')[0];
    if (path !== '/resume' && path !== '/resume/') return next();
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.statusCode = 405;
      res.setHeader('Allow', 'GET, HEAD');
      res.end();
      return;
    }
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="Kush-Agrawal-Resume.pdf"');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    if (req.method === 'HEAD') {
      res.end();
      return;
    }
    createReadStream(new URL('./public/resume.pdf', import.meta.url)).on('error', next).pipe(res);
  };
  return {
    name: 'resume-endpoint',
    configureServer(server) { server.middlewares.use(middleware); },
    configurePreviewServer(server) { server.middlewares.use(middleware); },
  };
};

// CI passes the commit it built from; local builds fall back to "dev" so the
// footer always tells you what is actually deployed.
const sha = process.env.BUILD_SHA?.slice(0, 7) || 'dev';

export default defineConfig({
  plugins: [react(), resumeEndpoint()],
  define: {
    __BUILD_SHA__: JSON.stringify(sha),
  },
});
