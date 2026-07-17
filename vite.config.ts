import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const packageJson = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8')) as { version: string }
const gitCommitCount = execSync('git rev-list --count HEAD').toString().trim()
const gitSha = execSync('git rev-parse --short HEAD').toString().trim()
const gitHistory = execSync('git log --date=short --pretty=format:"%h|%ad|%s" -n 6').toString().trim()
const changelogEntries = gitHistory
  .split('\n')
  .filter(Boolean)
  .map((line) => {
    const [hash = '', date = '', message = ''] = line.split('|');
    const [title, ...rest] = message.split(': ');
    const summary = rest.length > 0 ? rest.join(': ') : message;

    return {
      version: hash,
      date,
      title,
      summary,
    };
  });

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __APP_BUILD_INFO__: JSON.stringify(`v${packageJson.version}.${gitCommitCount} · ${gitSha}`),
    __APP_CHANGELOG__: JSON.stringify(changelogEntries),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
  },
})
