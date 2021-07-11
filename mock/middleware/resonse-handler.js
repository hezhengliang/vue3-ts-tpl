
import { logError } from '../utils/logger.js'
/**
 * 执行结果 handler 用来给每个响应对象包装响应码
 */
export const responseHandler = () => async (ctx, next) => {
  const r = { code: 200};
  try {
    const data = await next();
    if(!data){
      const rstatus = ctx.response && ctx.response.status ? ctx.response.status : 'xxx'
      const rmsg = ctx.response && ctx.response.message ? ctx.response.message : 'Unknown Error!!!'
      const eMsg = `${rstatus} ${rmsg}`
      logError(`[Result Error]` + eMsg);
      r.code = rstatus
      r.msg = eMsg;
      r.data = null;
    } else {
      r.code = 200;
      r.msg = 'success';
      r.data = data;
    }
  } catch (err) {
    logError('[Response Error]' + err);
    r.code = err.status ? err.status : 500
    r.msg = err && err.errors ? err.errors: (err.message ? err.message : err)
    r.data = null
  }
  ctx.body = r;
};