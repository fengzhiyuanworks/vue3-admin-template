// module.exports = {
//   "env": {
//     "browser": true,
//     "es2021": true,
//     "node": true
//   },
//   "extends": [
//     "eslint:recommended",
//     "plugin:vue/vue3-essential",
//     "plugin:@typescript-eslint/recommended"
//   ],
//   "overrides": [],
//   // "parser": "@typescript-eslint/parser",
//   // "parserOptions": {
//   //     "ecmaVersion": "latest",
//   //     "sourceType": "module"
//   // },
//   "parser": "vue-eslint-parser",
//   "parserOptions": {
//     "ecmaVersion": "latest",
//     "parser": "@typescript-eslint/parser",
//     "sourceType": "module"
//   },
//   "plugins": [
//     "vue",
//     "@typescript-eslint"
//   ],
//   "rules": {
//     'vue/multi-word-component-names': 'off'
//   }
// }

/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  // extends: "standard",
  root: true, // 项目根目录
  extends: [
    "eslint:recommended", // 默认使用eslint推荐的风格
    "plugin:vue/vue3-essential", // eslint-plugin-vue适用VUE3, 防止错误或意外行为的规则, 基本配置
    "plugin:vue/vue3-recommended", // eslint-plugin-vue适用VUE3，强制执行主观社区默认值以确保一致性的规则，增强型配置
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier",
    "prettier"
  ],
  parserOptions: {
    ecmaVersion: "latest" // 所有的JavaScript文件将被设置为最新版本的ECMAScript
  },
  rules: {
    // quotes: [
    //   2,
    //   "single",
    //   {
    //     avoidEscape: true,
    //     allowTemplateLiterals: true
    //   }
    // ]
    camelcase: ["error", {
      properties: "always"
    }], // 变量的命名时, 执行驼峰检测
    // "prettier/prettier": "error", //  prettier 格式错误被当作 ESLint 错误的效果
    "no-console": process.env.NODE_ENV == "production" ? "off" : "off",
    "no-alert": process.env.NODE_ENV == "production" ? "off" : "off",
    "no-debugger": process.env.NODE_ENV == "production" ? "off" : "off",
    "no-unused-vars": "error", // 禁止出现未使用过的变量
    "spaced-comment": ["error", "always"], // 注释符 // 或 /* 后面必须至少有一个空格
    "arrow-spacing": "error", // 箭头函数前后加空格 () => {}
    "vue/multi-word-component-names": "off", // 禁止检测组件由多个单词组成
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: 3 // 标签超出3个属性就会换行
      }
    ],
    "vue/no-textarea-mustache": "off", // 去掉<textarea>需绑定v-model限制
    "vue/v-on-event-hyphenation": "off", // 自定义组件的事件无需连接符，如@onChange变成@on-change
    "semi": 'off',//语句强制分号结尾
  }
};