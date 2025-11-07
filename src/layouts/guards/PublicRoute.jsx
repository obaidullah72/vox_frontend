import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function PublicRoute() {
  const token = useSelector((s) => s.auth.accessToken)
  const role = useSelector((s) => s.auth.role)
  if (token) {
    const target = role === 'seller' ? '/seller/dashboard' : role === 'buyer' ? '/buyer/dashboard' : '/dashboard'
    return <Navigate to={target} replace />
  }
  return <Outlet />
}


