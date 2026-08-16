import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export function Layout() {
  const { pathname } = useLocation()
  return (
    <div className="app-shell">
      <Navbar />
      <motion.main className="site-main" key={pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .28 }}>
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  )
}
