import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowDown, ArrowRight, Check, DollarSign, FileText, Headphones, Mail, Menu, PackageSearch, Phone, Route as RouteIcon, Truck, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ApplicationModal } from '@/components/application-modal';
import truckHighway from '@/assets/truck-highway.jpg';
import truckDriver from '@/assets/truck-driver.jpg';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'AZAI Trade | Trucking & Dispatching for Owner-Operators' },
    { name: 'description', content: 'Keep your truck moving with AZAI Trade. Professional truck dispatching, load finding, rate negotiation and freight support for owner-operators and carriers.' },
    { property: 'og:title', content: 'AZAI Trade | Trucking & Dispatching' },
    { property: 'og:description', content: 'You handle the road. We handle the dispatch. Truck dispatching and freight support for owner-operators and carriers.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});

const services = [
  { icon: Truck, title: 'Truck Dispatching', description: 'Professional dispatching services for owner-operators and trucking companies.' },
  { icon: PackageSearch, title: 'Load Finding', description: 'We search for available freight and help connect you with loads that fit your truck and preferred lanes.' },
  { icon: DollarSign, title: 'Rate Negotiation', description: 'We communicate with brokers and work to negotiate competitive rates for your loads.' },
  { icon: RouteIcon, title: 'Route & Trip Planning', description: 'Plan efficient routes and trips while helping reduce unnecessary empty miles.' },
  { icon: Headphones, title: 'Freight & Broker Communication', description: 'Professional communication with brokers and shippers throughout the load process.' },
  { icon: FileText, title: 'Paperwork & Administrative Support', description: 'Help with rate confirmations, load information, and other dispatch-related documentation.' },
];

function Wordmark({ footer = false }: { footer?: boolean }) {
  return <a href="#home" className={`wordmark ${footer ? 'wordmark-footer' : ''}`} aria-label="AZAI Trade home"><span className="wordmark-name">AZAI<span className="text-primary">.</span> <span className="wordmark-trade">TRADE</span></span><span className="wordmark-descriptor">TRUCKING & DISPATCHING</span></a>;
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [applicationOpen, setApplicationOpen] = useState(false);
  const openApplication = () => { setMenuOpen(false); setApplicationOpen(true); };
  return <>
    <header className="site-header">
      <div className="page-container header-inner">
        <Wordmark />
        <nav aria-label="Main navigation" className="desktop-nav"><a href="#home" className="nav-link">Home</a><a href="#services" className="nav-link">Services</a><a href="#about" className="nav-link">About</a></nav>
        <div className="header-actions"><a className="header-phone" href="tel:3479886771"><Phone className="size-4" />347-988-6771</a><Button onClick={openApplication} className="header-cta">GET STARTED <ArrowRight /></Button><Button variant="ghost" size="icon" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" className="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button></div>
      </div>
      {menuOpen && <nav id="mobile-navigation" aria-label="Mobile navigation" className="mobile-nav">{['Home', 'Services', 'About'].map(item => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}<Button onClick={openApplication}>GET STARTED <ArrowRight /></Button><a href="tel:3479886771"><Phone className="size-4" />347-988-6771</a></nav>}
    </header>
    <main>
      <section id="home" className="hero-section">
        <img src={truckHighway} width={1920} height={1088} alt="Commercial semi-truck hauling a freight trailer on an American highway" className="hero-image" fetchPriority="high" />
        <div className="hero-shade" />
        <div className="page-container hero-content">
          <div className="eyebrow hero-eyebrow"><span className="accent-line" />YOUR ROAD. OUR COMMITMENT.</div>
          <h1>AZAI Trade<span>Trucking & Dispatching</span></h1>
          <h2 className="hero-headline">Keep your truck moving.<br />We handle the dispatch.</h2>
          <p className="hero-description">Professional truck dispatching and freight support for owner-operators and carriers. We help you find loads, negotiate rates, and stay focused on the road.</p>
          <div className="hero-buttons"><Button className="cta-button" onClick={openApplication}>GET STARTED <ArrowRight /></Button><Button asChild variant="outline" className="hero-secondary cta-button"><a href="#services">OUR SERVICES <ArrowRight /></a></Button></div>
          <div className="hero-labels"><span>Truck Dispatching</span><span>Freight</span><span>Owner-Operators</span><span>Carriers</span></div>
        </div>
        <a href="#services" className="hero-scroll" aria-label="Explore our services"><ArrowDown className="size-4" /><span>BUILT FOR THE ROAD AHEAD</span></a>
      </section>
      <div className="commitment-strip"><div className="page-container commitment-inner"><div><Truck /><span>For owner-operators<br /><strong>and growing fleets</strong></span></div><div><RouteIcon /><span>Your lanes. Your truck.<br /><strong>Dispatch that works for you.</strong></span></div><div><Headphones /><span>A real person.<br /><strong>Reliable communication.</strong></span></div></div></div>
      <section id="services" className="section-services section-space">
        <div className="page-container">
          <div className="section-intro"><div><p className="eyebrow text-primary">THE SUPPORT BEHIND EVERY MILE</p><h2>Our Trucking &<br />Dispatching Services<span className="text-primary">.</span></h2></div><p>From finding the right loads to managing the details behind every trip, AZAI Trade helps keep your truck moving and your business running.</p></div>
          <div className="service-grid">{services.map((service, index) => <article className="service-card" key={service.title}><div className="service-card-top"><service.icon strokeWidth={1.6} className="size-8 text-primary" /><span className="service-number">0{index + 1}</span></div><h3>{service.title}</h3><p>{service.description}</p><div className="service-card-line" /></article>)}</div>
          <div className="services-bottom"><span>Your truck. Your business. A team in your corner.</span><a href="tel:3479886771">Let’s talk dispatch <ArrowRight className="size-4" /></a></div>
        </div>
      </section>
      <section id="about" className="section-about section-space"><div className="page-container about-grid">
        <div className="about-image-wrap"><img src={truckDriver} alt="Truck driver standing alongside a semi-truck and freight trailer" width={1024} height={1024} loading="lazy" className="about-image" /><div className="about-caption"><span className="caption-line" /><span>DRIVER-FOCUSED.<br /><strong>BUSINESS-MINDED.</strong></span></div></div>
        <div className="about-content"><p className="eyebrow text-primary">MORE THAN A DISPATCH SERVICE</p><h2>Built to keep<br />your truck moving<span className="text-primary">.</span></h2><p>At AZAI Trade, we understand that being on the road is more than just driving. Finding good freight, communicating with brokers, negotiating rates, and managing paperwork can take valuable time away from your business.</p><p>Our goal is simple: help truck drivers and carriers spend more time moving freight while we handle the dispatching side of the operation.</p><div className="about-highlights">{['Professional dispatching', 'Reliable communication', 'Load search support', 'Rate negotiation', 'Driver-focused service', 'Long-term business relationships'].map(item => <div key={item}><Check className="size-4 text-primary" /><span>{item}</span></div>)}</div><Button onClick={openApplication} variant="outline" className="about-cta">LET’S WORK TOGETHER <ArrowRight /></Button></div>
      </div></section>
      <section id="get-started" className="get-started-section"><div className="page-container get-started-inner"><div><p className="eyebrow text-primary">YOUR NEXT MILE STARTS HERE</p><h2>Ready to put your<br />truck to work?</h2><p>Tell us about yourself and your truck. Complete the form and the AZAI Trade team will contact you about getting started.</p><Button className="cta-button" onClick={openApplication}>GET STARTED <ArrowRight /></Button></div><div className="contact-panel"><p className="eyebrow">LET’S TALK TRUCKING</p><a href="tel:3479886771"><span className="contact-icon"><Phone /></span><span><small>GIVE US A CALL</small><strong>347-988-6771</strong></span><ArrowRight className="contact-arrow" /></a><a href="mailto:Iskai2773@gmail.com"><span className="contact-icon"><Mail /></span><span><small>SEND US AN EMAIL</small><strong>Iskai2773@gmail.com</strong></span><ArrowRight className="contact-arrow" /></a><p>AZAI Trade · Trucking & Dispatching</p></div></div></section>
    </main>
    <footer className="site-footer"><div className="page-container"><div className="footer-top"><Wordmark footer /><nav aria-label="Footer navigation"><a href="#home">Home</a><a href="#services">Services</a><a href="#about">About</a><Button variant="link" onClick={openApplication}>Get Started <ArrowRight /></Button></nav></div><div className="footer-contact"><a href="tel:3479886771"><Phone className="size-3.5" />347-988-6771</a><a href="mailto:Iskai2773@gmail.com"><Mail className="size-3.5" />Iskai2773@gmail.com</a></div><div className="footer-bottom"><p>© 2026 AZAI Trade. All Rights Reserved.</p><span>KEEP MOVING. WE’VE GOT YOUR BACK.</span></div></div></footer>
    <ApplicationModal open={applicationOpen} onOpenChange={setApplicationOpen} />
  </>;
}
