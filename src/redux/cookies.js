export function setCookie(name, value, expiresAtMs) {
  try {
    const parts = [`${encodeURIComponent(name)}=${encodeURIComponent(value)}`, 'path=/', 'SameSite=Lax']
    if (typeof expiresAtMs === 'number') {
      parts.push(`Expires=${new Date(expiresAtMs).toUTCString()}`)
    }
    if (typeof window !== 'undefined' && window.location && window.location.protocol === 'https:') {
      parts.push('Secure')
    }
    document.cookie = parts.join('; ')
  } catch (_e) {}
}

export function getCookie(name) {
  try {
    const cookies = document.cookie ? document.cookie.split('; ') : []
    for (const cookie of cookies) {
      const [k, ...rest] = cookie.split('=')
      if (decodeURIComponent(k) === name) {
        return decodeURIComponent(rest.join('='))
      }
    }
    return null
  } catch (_e) {
    return null
  }
}

export function removeCookie(name) {
  try {
    document.cookie = `${encodeURIComponent(name)}=; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Path=/; SameSite=Lax`
  } catch (_e) {}
}


