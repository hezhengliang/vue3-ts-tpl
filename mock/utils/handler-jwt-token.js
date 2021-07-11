const jwt = require('jsonwebtoken');
import { JWT_SECRET, JWT_EXPRIE_TIME } from '../config/index.js'

export const createJwtToken = (payload) => {
  if(typeof payload !== 'object') { throw error('token生成载荷必须为对象')}
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPRIE_TIME });
  return token
}