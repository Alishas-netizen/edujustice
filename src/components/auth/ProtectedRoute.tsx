import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export function ProtectedRoute({ admin = false }: { admin?: boolean }) {
  const { user, role, loading } = useAuth()
  const location = useLocation()
  if (loading) return <div className="page container-x" style={{display:'grid',placeItems:'center'}}><LoaderCircle className="animate-spin" /></div>
  if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />
  if (admin && role !== 'admin') return <Navigate to="/dashboard" replace />
  return <Outlet />
}
