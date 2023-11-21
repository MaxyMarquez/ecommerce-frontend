import { defineConfig,loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv('all', process.cwd())};

  // import.meta.env.VITE_NAME available here with: process.env.VITE_NAME
  // import.meta.env.VITE_PORT available here with: process.env.VITE_PORT

  return defineConfig({
      plugins: [react()],

      server: {
        host: '0.0.0.0',
        port: parseInt(process.env.VITE_PORT),
      },
  });
}