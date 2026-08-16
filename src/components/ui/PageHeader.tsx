export function PageHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <header className="page-hero"><div className="container-x"><span className="eyebrow">{eyebrow}</span><h1 className="title-xl">{title}</h1><p className="body-lg">{description}</p></div></header>
}
