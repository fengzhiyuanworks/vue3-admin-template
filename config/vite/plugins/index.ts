/* 独立管理 vite plugin */

import type { Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';

// plugin modules
import { configVisualizerConfig } from './visualizer';
import { configCompressPlugin } from './compress';
import { autoRegistryComponents } from './autoImportComponents';
import { autoImportStylePlugin } from './autoImportStyle';
import { AutoImportDeps } from './autoImportDeps';
import { imageminPlugin } from './imagemin'

import { LEGACY } from '../../constant'

export function createVitePlugins(isBuild: boolean) {
  const vitePlugins: (Plugin | Plugin[])[] = [
    // vue支持
    vue(),
    // JSX支持
    vueJsx(),
    // unplugin-vue-components/vite 自动按需引入组件
    autoRegistryComponents(),
    // 自动按需引入依赖 , 目前针对 vue / vue-router
    AutoImportDeps(),
  ];

  // @vitejs/plugin-legacy 浏览器兼容
  isBuild && LEGACY && vitePlugins.push(legacy({ targets: ['Chrome 64'], modernPolyfills: true }));

  // rollup-plugin-gzip gzip压缩
  isBuild && vitePlugins.push(configCompressPlugin());

  // rollup-plugin-visualizer 构建分析
  isBuild && vitePlugins.push(configVisualizerConfig());

  // vite-plugin-style-import
  // isBuild && vitePlugins.push(autoImportStylePlugin());

  // vite-plugin-imagemin 图片压缩
  // isBuild && vitePlugins.push(imageminPlugin())

  return vitePlugins;
}
