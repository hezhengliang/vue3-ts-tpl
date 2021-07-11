import { post, prefix ,get} from "../utils/request-decorator.js";
import userList from "../mockdb/user-list.js";
import { createJwtToken } from '../utils/handler-jwt-token.js'
@prefix('/user')
export default class User{
  @get('/register')
  async register(ctx){
    const paras = ctx.query
    console.log(paras.userName)
    return {
      'msg': 'register success',
    }
  }
  @post('/login')
  async login(ctx){
    ctx.verifyParams({
      userName: { type: "string", required: true },
    });
    const paras = ctx.request.body
    const token = createJwtToken({"userName": paras.userName})
    return {
      'msg': 'login success!',
      'token': token
    }
  }
  @post('/refreshToken')
  async refreshToken(ctx){
    ctx.verifyParams({
      userName: { type: "string", required: true },
    });
    const paras = ctx.request.body
    const token = createJwtToken({"userName": paras.userName})
    return {
      'msg': 'Token Refresh',
      'token': token
    }
  }

  @get('/userInfo')
  async getUsers(ctx){
    return userList
  }
  @get('/tarUser')
  async getTarUser(ctx){
    ctx.verifyParams({
      id: { type: "string", required: true },
    });
    return 'get Tar User'
  }
}