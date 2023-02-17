/**
 *  按需导入组件库样式
 * https://github.com/vbenjs/vite-plugin-style-import/blob/main/README.zh_CN.md
 */
import {
  createStyleImportPlugin,
  AndDesignVueResolve,
  // VantResolve,
  // ElementPlusResolve,
  // NutuiResolve,
  // AntdResolve,
} from 'vite-plugin-style-import'

export function configStyleImportPlugin() {
  // if (!isBuild) return [];
  const pwaPlugin = createStyleImportPlugin({
    resolves: [
      AndDesignVueResolve(),
      // VantResolve(),
      // ElementPlusResolve(),
      // NutuiResolve(),
      // AntdResolve()
    ],
    libs: [
      // 如果没有你需要的resolve，可以在lib内直接写，也可以给我们提供PR
      {
        libraryName: 'ant-design-vue',
        esModule: true,
        resolveStyle: (name) => {
          return `ant-design-vue/es/${name}/style/index`
        },
      },
    ],
  })
  return pwaPlugin;
}

