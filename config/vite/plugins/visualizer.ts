/**
 * Package file volume analysis
 */
import { visualizer } from 'rollup-plugin-visualizer';
import { ANALYSIS } from '../../constant';

export function configVisualizerConfig() {
  if (ANALYSIS) {
    return visualizer({
      filename: './node_modules/.cache/visualizer/stats.html', // 在 node_modules 缓存中存预览文件
      open: true, // 是否自动打开
      gzipSize: true,
    }) as Plugin;
  }
  return [];
}
