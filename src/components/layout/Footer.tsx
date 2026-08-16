import { Link } from 'react-router-dom'
import { ArrowUpRight, ShieldCheck } from 'lucide-react'

const columns = [
  { title: 'Platform', links: [['Home','/'],['Report corruption','/report'],['Track complaint','/track'],['Know your rights','/rights'],['Statistics','/statistics']] },
  { title: 'Information', links: [['About us','/about'],['Awareness','/awareness'],['Resources','/resources']] },
  { title: 'Legal', links: [['Privacy policy','/privacy'],['Terms','/terms'],['Disclaimer','/disclaimer']] },
]
export function Footer() {
  return <footer className="footer"><div className="container-x footer-grid">
    <div className="footer-brand"><div className="brand"><span className="brand-mark"><ShieldCheck size={18}/></span><span>EDU<span>JUSTICE</span></span></div><p>An independent education transparency and student-rights platform. Report safely. Track securely. Demand fairness.</p><a href="https://github.com/Alishas-netizen/edujustice/issues" target="_blank" rel="noopener noreferrer">Project support on GitHub <ArrowUpRight size={14}/></a></div>
    {columns.map((column) => <div key={column.title}><h3>{column.title}</h3>{column.links.map(([label,path]) => <Link key={path} to={path}>{label}</Link>)}</div>)}
  </div><div className="container-x footer-bottom"><span>© 2026 EduJustice. All rights reserved.</span><span className="mono">INDEPENDENT PLATFORM / BUILD 01</span></div></footer>
}
