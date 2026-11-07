import * as path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const isBuild = process.env.npm_lifecycle_event === 'build'

if (!isBuild) {
  if (!process.env.PORT) {
    throw new Error("Missing PORT in environment variables")
  }

  if (!process.env.ALLOWED_HOSTS) {
    throw new Error("Missing ALLOWED_HOSTS in environment variables")
  }
}

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  preview: {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000, // will be overridden at runtime
    host: true,
    allowedHosts: process.env.ALLOWED_HOSTS ? process.env.ALLOWED_HOSTS.split(',') : []
  }
})
