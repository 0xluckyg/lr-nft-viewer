const navigator: Navigator | undefined =
  typeof window !== 'undefined' ? window.navigator : undefined

export function isIOS(): boolean {
  return navigator?.userAgent.match(/ipad|iphone/i) != null
}

export function isAndroid(): RegExpMatchArray | boolean {
  return navigator?.userAgent.match(/Android/i) ?? false
}

export function isMobile(): RegExpMatchArray | boolean {
  return isIOS() || isAndroid()
}

export function isServer(): boolean {
  return typeof window === 'undefined' && typeof global !== 'undefined'
}

export function isClient(): boolean {
  return !isServer()
}
