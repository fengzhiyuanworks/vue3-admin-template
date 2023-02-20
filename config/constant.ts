// 开启资源分析
export const ANALYSIS = false
// 开启gzip压缩
export const COMPRESS = false
// 开启浏览器兼容 legacy
export const LEGACY = true
// 代理源环境
export const PROXY_ORGIN_ENV = 'dev';
// 代理配置 B
interface IProxyTableItem {
  [env: string]: {
    [api: string]: string
  }
}
export const PROXYTABLEMAP: IProxyTableItem = {
  'dev': {
    'api': 'xxxx'
  },
  'test': {
    'api': 'xxxx'
  }
}

export const PROXYTABLE = PROXYTABLEMAP[PROXY_ORGIN_ENV]
// 代理配置 E
