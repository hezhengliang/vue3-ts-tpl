const tokenVerify = () => {
  return function (ctx, next) {
    return next().catch((err) => {
      let expiredErr = err.originalError && err.originalError.message === 'jwt expired' ? 'token失期' : null
      if (err.status === 401) {
        ctx.status = 401;
        ctx.body = {
          code: 401,
          data: null,
          msg: expiredErr ? expiredErr : '鉴权失败!'
        };
      } else {
        throw err;
      }
    });
  }
}
export default tokenVerify;
