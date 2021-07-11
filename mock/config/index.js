export const JWT_SECRET = 'server-api-jwt-screct'
export const JWT_EXPRIE_TIME = '7d'

export const UNLESS_PATH = [/^\/user\/refreshToken/, /^\/user\/login/, /^\/user\/register/]

export const BASE_PATH_MAP = Symbol('path_map');
export const ROUTER_MAP = Symbol('route_map')