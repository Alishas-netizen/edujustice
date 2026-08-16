import { ArrowLeft, ScanLine } from 'lucide-react'
import { Link } from 'react-router-dom'
export function NotFoundPage(){return <section className="page container-x" style={{display:'grid',placeItems:'center',textAlign:'center'}}><div><ScanLine size={52} color="var(--red)"/><span className="eyebrow" style={{marginTop:20}}>Error 404</span><h1 className="title-xl">Signal not found.</h1><p className="body-lg" style={{margin:'0 auto 28px'}}>The requested route does not exist or has moved.</p><Link to="/" className="btn btn-primary"><ArrowLeft size={16}/>Return home</Link></div></section>}
