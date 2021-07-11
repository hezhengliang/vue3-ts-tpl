export function getParameterValue(param:string|null) {
  const reg:RegExp = new RegExp("(^|&)" + param + "=([^&]*)(&|$)", "i")
  const r:Array<string>|null = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}
