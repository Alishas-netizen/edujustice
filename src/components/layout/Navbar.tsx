import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { LogOut, Menu, ShieldCheck, X } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import './layout.css'

const nav = [
  ['Home', '/'], ['Corruption', '/corruption'], ['Solutions', '/solutions'], ['Report', '/report'],
  ['Your Rights', '/rights'], ['Statistics', '/statistics'], ['Awareness', '/awareness'], ['Resources', '/resources'],
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const handleLogout = async () => { await logout(); navigate('/') }
  return (
    <header className="navbar">
      <div className="container-x nav-inner">
        <Link to="/" className="brand" aria-label="EduJustice home"><span className="brand-mark"><ShieldCheck size={18} /></span><span>EDU<span>JUSTICE</span></span></Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.map(([label, path]) => <NavLink key={path} to={path} className={({ isActive }) => isActive ? 'active' : ''}>{label}</NavLink>)}
        </nav>
        <div className="nav-actions">
          <Link className="track-link" to="/track">Track ID</Link>
          {user ? <>
            <Link className="login-link" to="/dashboard">Dashboard</Link>
            <button className="logout-btn" onClick={handleLogout} aria-label="Log out"><LogOut size={17} /></button>
          </> : <Link className="login-link" to="/login">Login</Link>}
          <button className="menu-btn" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      {open && <nav className="mobile-nav container-x" aria-label="Mobile navigation">
        {nav.map(([label, path]) => <NavLink key={path} to={path} onClick={() => setOpen(false)}>{label}</NavLink>)}
        <NavLink to="/track" onClick={() => setOpen(false)}>Track complaint</NavLink>
        {user
          ? <NavLink to="/dashboard" onClick={() => setOpen(false)}>Dashboard</NavLink>
          : <><NavLink to="/login" onClick={() => setOpen(false)}>Login</NavLink><NavLink to="/register" onClick={() => setOpen(false)}>Create account</NavLink></>}
      </nav>}
    </header>
  )
}
