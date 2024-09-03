import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

//https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
})


// export default ({ mode }) => {
//   const env = loadEnv(mode, process.cwd(), "");
//   return defineConfig({
//     define: {
//       "process.env": env,
//     },
//     plugins: [vue()],
//     server: {
//       host: true,
//       port: 8080,
//     },
//     resolve: {
//       alias: {
//         "@": fileURLToPath(new URL("./src", import.meta.url)),
//       },
//     },
//   });
// };