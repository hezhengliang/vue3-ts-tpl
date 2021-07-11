import Koa from 'koa';
import koaRouter from "koa-router";
import logger from "koa-logger";
import cors from "koa2-cors";
import addRoutes from './router.js'
import { responseHandler } from './middleware/resonse-handler.js'
import tokenVerify from './middleware/token-verify.js'
import { logInfo, logError, logDebug } from './utils/logger.js'
import { JWT_SECRET, UNLESS_PATH } from './config/index.js'
const app = new Koa()
const compress = require('koa-compress');
const parameter = require("koa-parameter");
const bodyParser = require('koa-bodyparser');
const koaJwt = require('koa-jwt');

//-- koa-jwt 鉴权处理
app.use(tokenVerify())
app.use(koaJwt({ secret: JWT_SECRET })
.unless({ path: UNLESS_PATH }))

const router = new koaRouter()
app.use(cors())
//-- 参数验证
app.use(parameter(app));
//--请求body解析
app.use(bodyParser())

const port = 3300;
app.use(logger( log => {
  logDebug(log)
}))

//-- compress 请求数据压缩
app.use(compress({
  filter (content_type) {
    return /text/i.test(content_type)
  },
  threshold: 2048,
  gzip: {
    flush: require('zlib').constants.Z_SYNC_FLUSH
  },
  deflate: {
    flush: require('zlib').constants.Z_SYNC_FLUSH,
  },
  br: false // disable brotli
}))

//-- middleware handle response
app.use(responseHandler());

//--加载路由
addRoutes(router);
//--启动路由
app.use(router.routes()).use(router.allowedMethods());

// koa already had middleware to deal with the error, just register the error event
app.on("error", (err, ctx) => {
  logError(`[App Catch Error]` + err); //log all errors
  ctx.status = 500;
  if (ctx.app.env !== "development") {
    //throw the error to frontEnd when in the develop mode
    ctx.res.end(err.stack); //finish the response
  }
});

app.listen(port, () => {
  logInfo(`应用已经启动，http://localhost:${port}`)
})
