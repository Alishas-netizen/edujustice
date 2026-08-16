import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, FileLock2, Network, Radar, ShieldAlert } from 'lucide-react'
import { corruptionTypes, solutions } from '../data/content'
import { Reveal } from '../components/ui/Reveal'
import './home.css'

export function HomePage() {
  return <>
    <section className="hero-section"><div className="container-x hero-grid">
      <div className="hero-copy"><motion.span className="eyebrow" initial={{opacity:0}} animate={{opacity:1}}>Education integrity protocol</motion.span>
        <motion.h1 className="display" initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{duration:.55}}>Say No to<br/><span className="outline">Education</span><br/><span className="red">Corruption.</span></motion.h1>
        <motion.p className="body-lg" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.25}}>Know your rights. Report unfair practices. Help make education transparent, accountable, and fair.</motion.p>
        <motion.div className="hero-actions" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:.36}}><Link to="/report" className="btn btn-primary">Report corruption <ArrowRight size={17}/></Link><Link to="/rights" className="btn btn-secondary">Know your rights</Link></motion.div>
        <div className="trust-row"><span><FileLock2 size={14}/> Private case records</span><span><ShieldAlert size={14}/> Anonymous mode</span><span><CheckCircle2 size={14}/> Secure tracking</span></div>
      </div>
      <motion.div className="hero-visual" initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}} transition={{duration:.7,delay:.12}}>
        <div className="radar-ring ring-1"/><div className="radar-ring ring-2"/><div className="radar-ring ring-3"/>
        <div className="shield-core"><ShieldAlert size={64}/><span>REPORT<br/>SECURELY</span></div>
        <div className="signal-card signal-a"><Radar size={15}/><span>STATUS</span><strong>PROTECTED</strong></div>
        <div className="signal-card signal-b"><Network size={15}/><span>SYSTEM</span><strong>ONLINE</strong></div>
        <span className="coordinate c1">19.0760° N</span><span className="coordinate c2">72.8777° E</span>
      </motion.div>
    </div><div className="hero-marquee"><div>FAIR ADMISSION // SAFE REPORTING // STUDENT RIGHTS // TRANSPARENT INSTITUTIONS // ACCOUNTABILITY //</div></div></section>

    <section className="section"><div className="container-x"><Reveal><div className="section-head"><div><span className="eyebrow">Recognize the threat</span><h2 className="title-lg">Corruption hides in<br/>ordinary processes.</h2></div><p className="body-lg">Learn the patterns. Preserve the facts. Use the correct reporting channel.</p></div></Reveal><div className="grid-3">{corruptionTypes.map((item,i)=><Reveal key={item.title} delay={i*.05}><article className="card card-hover"><div className="icon-box"><item.icon size={22}/></div><span className="section-index">0{i+1}</span><h3>{item.title}</h3><p>{item.description}</p></article></Reveal>)}</div></div></section>
    <div className="danger-line"/>
    <section className="section solution-section"><div className="container-x"><Reveal><div className="section-head"><div><span className="eyebrow">Action framework</span><h2 className="title-lg">Transparency is<br/>built, not promised.</h2></div><Link className="btn btn-secondary" to="/solutions">Explore solutions <ArrowRight size={16}/></Link></div></Reveal><div className="solution-list">{solutions.map((item,i)=><Reveal key={item.title} delay={i*.04}><Link className="solution-row" to="/solutions"><span>0{i+1}</span><item.icon size={22}/><h3>{item.title}</h3><p>{item.description}</p><ArrowRight size={18}/></Link></Reveal>)}</div></div></section>
    <section className="cta-section"><div className="container-x cta-inner"><div><span className="eyebrow">Your voice matters</span><h2>See it. Record it.<br/><span>Report it.</span></h2></div><div><p>Every verified report strengthens education accountability.</p><Link className="btn btn-primary" to="/report">Start secure report <ArrowRight size={17}/></Link></div></div></section>
  </>
}
