import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const RENDER_URL = "https://mern-tutorial-yzc5.onrender.com";
const DEV_URL = "http://localhost:5000";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
		proxy: {
			"/api": {
				target: RENDER_URL,
			},
		},
	},
	build: { chunkSizeWarningLimit: 1600, }
})
