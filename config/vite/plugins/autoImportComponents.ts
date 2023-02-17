/**
 * @name autoRegistryComponents
 * @description 按需加载，自动引入组件
 */

import Components from 'unplugin-vue-components/vite' // 按需加载自定义组件
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers' // 自动按需引入 antd

export const autoRegistryComponents = () => {
  return Components({
    dirs: ['src/common/components'], // 配置需要默认导入的自定义组件文件夹，该文件夹下的所有组件都会自动 import
    dts: './src/types/autoComponent.d.ts', // 生成 自定引入组件的ts 文件查看导入信息
    resolvers: [
      AntDesignVueResolver({
        importStyle: false, // 指是否需要自动随引入加载对应的组件样式 某些二级组件（比如 DateRangePicker）没办法准确地识别正确路径，他的搜寻路径都是按一级组件来写的
        resolveIcons: true // 自动引入图标
      })]
  })
}