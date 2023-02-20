// https://vitejs.dev/config/
import { defineConfig, loadEnv } from 'vite'
import * as path from 'path';
import { createVitePlugins } from './config/vite/plugins'
import { configManualChunk } from './config/vite/optimizer';
import { generateModifyVars } from './config/themeConfig';


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, './config/vite/env');
  console.log('env----------->', env, mode)
  return {
    plugins: createVitePlugins(true),
    envDir: path.resolve(__dirname, './config/vite/env'),
    resolve: {
      //设置别名
      alias: {
        '@': path.resolve(__dirname, './src'),
        // '@common': path.resolve(__dirname, 'src/common'),
        // '@components': path.resolve(__dirname, 'src/common/components'),
      }
    },
    server: {
      port: 8080, //启动端口
      hmr: {
        host: '127.0.0.1',
        port: 8080
      },
      // 设置 https 代理
      proxy: {
        '/api': {
          target: 'your https address',
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, '')
        }
      }
    },
    esbuild: {
      // drop: ["console", "debugger"] // 推荐esbuild，速度比terser快
    },
    build: {
      // assetsInlineLimit:1024*4, // vite默认将小于4k资源转base64
      target: 'es2015',
      minify: 'terser',
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: configManualChunk,
        },
      },
      // Turning off brotliSize display can slightly reduce packaging time
      reportCompressedSize: false,
      chunkSizeWarningLimit: 2000,
    },
    css: {
      preprocessorOptions: {
        less: {
          // 修改 antdv 样式变量
          modifyVars: generateModifyVars(),
          // 注入全局变量
          additionalData: `@import '@/common/style/_variable.less';`,
          javascriptEnabled: true,
          charset: false // ??
        },
      },
    },
  }
})
