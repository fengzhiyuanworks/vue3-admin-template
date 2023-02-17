/**
 * 图片压缩
 * vite-plugin-imagemin 图片压缩,依赖 imagemin,几种安装方案并不具备普适性,  先不使用
 * https://github.com/vbenjs/vite-plugin-imagemin/blob/main/README.zh_CN.md
*/

import type { Plugin } from 'vite';
import viteImagemin from 'vite-plugin-imagemin'

export function imageminPlugin(): Plugin | Plugin[] {
  return viteImagemin({
    gifsicle: {
      optimizationLevel: 7,
      interlaced: false
    },
    optipng: {
      optimizationLevel: 7
    },
    mozjpeg: {
      quality: 20
    },
    pngquant: {
      quality: [0.8, 0.9],
      speed: 4
    },
    svgo: {
      plugins: [
        {
          name: 'removeViewBox'
        },
        {
          name: 'removeEmptyAttrs',
          active: false
        }
      ]
    }
  }) as Plugin;
}