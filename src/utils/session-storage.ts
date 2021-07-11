/**
 * set storage
 * @param key
 * @param value
 */
export function setStorage(key:string, value: any) {
  if (!window.sessionStorage) {
    throw new Error('该浏览器不支持sessionStorage');//
  } else {
    if (typeof value === 'object') {
      window.sessionStorage.setItem(key, window.JSON.stringify(value))
    } else {
      window.sessionStorage.setItem(key, value)
    }
  }

}
/**
 * get storage
 * @param key
 */
export function getStorage(key:string) {
  if (!window.sessionStorage) {
    throw new Error('该浏览器不支持sessionStorage');
  } else {
    return window.sessionStorage.getItem(key)
  }
}
/**
 * remove by key
 * @param key
 */
export function removeItem(key:string) {
  window.sessionStorage.removeItem(key)
}

//clear all storage
export function clearAll() {
  window.sessionStorage.clear()
}