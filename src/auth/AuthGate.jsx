import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { loginSucceeded, logout as logoutAction } from '../redux/slices/authSlice'
import { fetchUserProfile } from '../redux/slices/getUserProfileSlice'
import { getCookie } from '../redux/cookies'

function decodeJwtExp(token) {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')))
    if (!payload || !payload.exp) return null
    return payload.exp * 1000
  } catch (_e) {
    return null
  }
}

function decodeJwtRole(token) {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')))
    return payload?.role || null
  } catch (_e) {
    return null
  }
}

export default function AuthGate({ children }) {
  const dispatch = useDispatch()
  const accessToken = useSelector((s) => s.auth.accessToken)
  const expiresAt = useSelector((s) => s.auth.expiresAt)
  const logoutTimerRef = useRef(null)
  const profileIntervalRef = useRef(null)

  useEffect(() => {
    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    } else {
      delete axios.defaults.headers.common['Authorization']
    }
  }, [accessToken])

  useEffect(() => {
    if (accessToken && !expiresAt) {
      const inferred = decodeJwtExp(accessToken)
      if (inferred) {
        dispatch(loginSucceeded({ accessToken, expiresAt: inferred }))
      }
      return
    }
    if (!accessToken) {
      const cookieToken = getCookie('auth.token')
      const cookieExpRaw = getCookie('auth.expiresAt')
      const cookieRole = getCookie('auth.role')
      const cookieExp = cookieExpRaw ? Number(cookieExpRaw) : null
      if (cookieToken) {
        const inferred = cookieExp || decodeJwtExp(cookieToken) || null
        const role = cookieRole || decodeJwtRole(cookieToken) || null
        dispatch(loginSucceeded({ accessToken: cookieToken, expiresAt: inferred, role }))
      }
    }
  }, [])

  

  useEffect(() => {
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current)
      logoutTimerRef.current = null
    }

    if (!accessToken || !expiresAt) return

    const now = Date.now()
    const msRemaining = Math.max(0, expiresAt - now)
    if (msRemaining === 0) {
      dispatch(logoutAction())
      return
    }

    logoutTimerRef.current = setTimeout(() => {
      dispatch(logoutAction())
    }, msRemaining)

    return () => {
      if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current)
    }
  }, [accessToken, expiresAt, dispatch])

  // Fetch user profile immediately on login and then every 3 minutes
  useEffect(() => {
    if (profileIntervalRef.current) {
      clearInterval(profileIntervalRef.current)
      profileIntervalRef.current = null
    }

    if (!accessToken) return

    // Immediate fetch on login/token availability
    dispatch(fetchUserProfile())

    // Poll every 3 minutes
    profileIntervalRef.current = setInterval(() => {
      dispatch(fetchUserProfile())
    }, 3 * 60 * 1000)

    return () => {
      if (profileIntervalRef.current) clearInterval(profileIntervalRef.current)
    }
  }, [accessToken, dispatch])

  return children
}


