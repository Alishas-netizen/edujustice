import { ExternalLink, Landmark, Scale, SearchCheck } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'
const resources=[
  {title:'Ministry of Education, India',url:'https://www.education.gov.in/',type:'Government education portal'},
  {title:'National Scholarship Portal',url:'https://scholarships.gov.in/',type:'Scholarship portal'},
  {title:'UGC e-Samadhan',url:'https://samadhaan.ugc.ac.in/',type:'Student grievance resource'},
  {title:'CBSE',url:'https://www.cbse.gov.in/',type:'Examination resource'},
  {title:'National Consumer Helpline',url:'https://consumerhelpline.gov.in/',type:'Consumer awareness resource'},
  {title:'CPGRAMS',url:'https://pgportal.gov.in/',type:'Public grievance portal'},
]
export function ResourcesPage(){return <><PageHeader eyebrow="Verified routes" title="Official resources." description="Use authoritative government and regulatory portals for education information, scholarships, examinations, and grievances."/><section className="section"><div className="container-x"><div className="alert" style={{marginBottom:26}}><SearchCheck size={20}/><span>Links below point to official public resources. Always verify the domain before entering personal information.</span></div><div className="grid-3">{resources.map((resource,i)=><a className="card card-hover" key={resource.url} href={resource.url} target="_blank" rel="noopener noreferrer"><div className="icon-box">{i%2?<Scale/>:<Landmark/>}</div><span className="section-index">{resource.type}</span><h3>{resource.title}</h3><p style={{display:'flex',alignItems:'center',gap:8}}>Open official portal <ExternalLink size={14}/></p></a>)}</div></div></section></>}
