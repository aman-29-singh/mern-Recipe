import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [ tailwindcss(),react()],
  server: {
    proxy: {
      "/api": {//so by doing this this "http:localhost:5000" will always before "/api" everywhere we write /api this will befor it
        target: "http://localhost:5000"
      }
    }
  }
})
