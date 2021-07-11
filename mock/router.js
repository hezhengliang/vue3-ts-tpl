/** 
 * @Author: ZY
 * Code Soucrce:https://github.com/rcyj-FED/vue3-composition-admin/mock
*/
import 'reflect-metadata'
import fs from 'fs'
import path from 'path'
import { ROUTER_MAP ,BASE_PATH_MAP} from './config/index.js'
const __dirname = path.resolve();

export default function addRoutes(router){
  const ctrPath = path.join(__dirname, 'controller');
  const modules = [];
  fs.readdirSync(ctrPath).forEach(name => {
    if (/^[^.]+\.(t|j)s$/.test(name)) {
      modules.push(require(path.join(ctrPath, name)).default)
    }
  });

  // 结合meta数据添加路由 和 验证
  modules.forEach(m => {
    const routerMap = Reflect.getMetadata(ROUTER_MAP, m, 'method') || [];
    const basePathMap = Reflect.getMetadata(BASE_PATH_MAP, m) || [];
    const basePath = basePathMap.pop();
    if (routerMap.length) {
      const ctr = new m();
      routerMap.forEach(route => {
        const {name, method, path} = route;
        const newPath = basePath ? (basePath.path + path) : path;
        router[method](newPath, ctr[name]);
      })
    }
  })
}