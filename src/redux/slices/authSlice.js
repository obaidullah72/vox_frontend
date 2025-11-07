import { createSlice } from '@reduxjs/toolkit'
import { getCookie, setCookie, removeCookie } from '../cookies'

const COOKIE_KEYS = {
  token: 'auth.token',
  expiresAt: 'auth.expiresAt',
  role: 'auth.role',
}

function loadFromCookies() {
  try {
    const token = getCookie(COOKIE_KEYS.token)
    const expiresAtRaw = getCookie(COOKIE_KEYS.expiresAt)
    const role = getCookie(COOKIE_KEYS.role)
    const expiresAt = expiresAtRaw ? Number(expiresAtRaw) : null
    return {
      accessToken: token || null,
      expiresAt: Number.isFinite(expiresAt) ? expiresAt : null,
      role: role || null,
    }
  } catch (_e) {
    return { accessToken: null, expiresAt: null, role: null }
  }
}

function saveToCookies(token, expiresAt) {
  try {
    if (token) setCookie(COOKIE_KEYS.token, token, expiresAt || undefined)
    if (expiresAt) setCookie(COOKIE_KEYS.expiresAt, String(expiresAt), expiresAt)
  } catch (_e) {}
}

function clearCookies() {
  try {
    removeCookie(COOKIE_KEYS.token)
    removeCookie(COOKIE_KEYS.expiresAt)
    removeCookie(COOKIE_KEYS.role)
  } catch (_e) {}
}

const initialSession = loadFromCookies()

const initialState = {
  accessToken: initialSession.accessToken,
  expiresAt: initialSession.expiresAt,
  role: initialSession.role,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSucceeded(state, action) {
      const { accessToken, expiresAt, role } = action.payload
      state.accessToken = accessToken
      state.expiresAt = expiresAt || null
      saveToCookies(accessToken, expiresAt || null)
      if (role) {
        state.role = role
        try { setCookie(COOKIE_KEYS.role, role, expiresAt || undefined) } catch (_e) {}
      }
    },
    logout(state) {
      state.accessToken = null
      state.expiresAt = null
      state.role = null
      clearCookies()
    },
  },
})

export const { loginSucceeded, logout } = authSlice.actions
export default authSlice.reducer


