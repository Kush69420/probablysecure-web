import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// CI passes the commit it built from; local builds fall back to "dev" so the
// footer always tells you what is actually deployed.
const sha = process.env.BUILD_SHA?.slice(0, 7) || 'dev';

export default defineConfig({
  plugins: [react()],
  define: {
    __BUILD_SHA__: JSON.stringify(sha),
  },
});
