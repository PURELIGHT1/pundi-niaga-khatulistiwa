import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import vuetify from "vite-plugin-vuetify"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    vuetify()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  optimizeDeps: {
    include: ['vue', 'vue-i18n','src']
  },  
  build: {
    minify: "esbuild",
    cssMinify: "lightningcss",
    rollupOptions: {
      output: {
        generatedCode: {
          preset: "es2015",
          arrowFunctions: true,
          constBindings: true,
          objectShorthand: true,
          reservedNamesAsProps: true,
          symbols: false,
        },
        manualChunks : undefined,
      },
    },
  },
  worker: {
    format: 'es',
  },
})
// export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
//   const baseConfig = {
//     plugins: [
//       vue(),
//       vueDevTools(),
//       vuetify()
//     ],
//     resolve: {
//       alias: {
//         '@': fileURLToPath(new URL('./src', import.meta.url))
//       },
//     },
//     optimizeDeps: {
//       include: ['vue', 'vue-i18n']
//     }, 
//     build: {
//       minify: "esbuild",
//       cssMinify: "lightningcss",
//       rollupOptions: {
//         output: {
//           generatedCode: {
//             preset: "es2015",
//             arrowFunctions: true,
//             constBindings: true,
//             objectShorthand: true,
//             reservedNamesAsProps: true,
//             symbols: false,
//           },
//           manualChunks(id) {
//             if (id.includes("node_modules")) {
//               return id
//                 .toString()
//                 .split("node_modules/")[1]
//                 .split("/")[0]
//                 .toString();
//             }
//           },
//         },
//       },
//     },
//   };
//   if (command === "serve") {
//     return {
//       ...baseConfig,
//       define: {
//         __BACK_WS_URI__: "ws://localhost:8080/ws",
//         __BACK_HTTP_SPA__: "http://localhost:8080/spa",
//       },
//     };
//   } else {
//     return {
//       ...baseConfig,
//       define: {
//         __BACK_WS_URI__: "'ws://localhost:8080/ws'",
//         __BACK_HTTP_SPA__: "'http://localhost:8080/spa'",
//       },
//     };
//   }
// });
