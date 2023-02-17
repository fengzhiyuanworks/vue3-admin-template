/**
 * 使用 gzip 或者 brotli 来压缩资源.
 * https://github.com/vbenjs/vite-plugin-compression/blob/main/README.zh_CN.md
 */
import type { Plugin } from 'vite';
import compressPlugin from 'vite-plugin-compression';
import { COMPRESS } from '../../constant';

export function configCompressPlugin(): Plugin | Plugin[] {
  if(!COMPRESS) return []
  return compressPlugin({
    ext: '.gz',
    deleteOriginFile: false,
  }) as Plugin;
}
