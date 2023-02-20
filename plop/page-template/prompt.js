export default {
  description: '创建新页面模块',
  prompts: [{
      type: 'input',
      name: 'name',
      message: '请输入页面模块英文，例如 "demo" :',
      validate(value) {
        if (!value || value.trim === '') {
          return 'name is required';
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'cname',
      message: '请输入页面模块中文，例如 "演示模块" :',
    }
  ],
  actions: (data) => {
    const dataName = data.name
    const actions = [{
        type: 'add',
        path: `${process.cwd()}/src/pages/${dataName}/api.ts`, // 这里的name就是上面定义的键
        templateFile: './page-template/_api_ts.hbs',
        data
      },
      {
        type: 'add',
        path: `${process.cwd()}/src/pages/${dataName}/router.ts`, // 这里的name就是上面定义的键
        templateFile: './page-template/_router_ts.hbs',
        data
      },
      {
        type: 'add',
        path: `${process.cwd()}/src/pages/${dataName}/index.vue`, // 这里的name就是上面定义的键
        templateFile: './page-template/_index_vue.hbs',
        data
      }
    ]

    return actions
  }
}