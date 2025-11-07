import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function RoleRoute({ allow }) {
  const token = useSelector((s) => s.auth.accessToken)
  const role = useSelector((s) => s.auth.role)
  if (!token) return <Navigate to="/" replace />
  if (allow && Array.isArray(allow) && !allow.includes(role)) return <Navigate to="/" replace />
  return <Outlet />
}


