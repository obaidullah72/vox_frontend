import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function PrivateRoute() {
  const token = useSelector((s) => s.auth.accessToken)
  if (!token) return <Navigate to="/" replace />
  return <Outlet />
}


