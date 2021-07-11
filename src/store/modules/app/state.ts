enum DeviceType {
  Mobile,
  Desktop
}
export type AppState = {
  device: DeviceType,
  size: number,
  count: number
}

export const state: AppState = {
  device: DeviceType.Desktop,
  size: 1920,
  count: 1
}
