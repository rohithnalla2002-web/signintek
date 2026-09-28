import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { initSite } from './effects'
import { getProduct, products } from './products'

export default function ProductPage() {
  const { slug } = useParams()
  const product = getProduct(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = product
      ? `${product.name} — Signin Technologies`
      : 'Products — Signin Technologies'
    return initSite()
  }, [product])

  return (
    <>
      <a className="skip-link" href="#product">Skip to content</a>
      <div className="cursor"><span></span></div>
      <div className="progress"><i></i></div>
      <header className="nav" id="nav">
        <a href="/" className="logo" aria-label="Signin Technologies">
          <img src="/signin-logo.png" alt="Signin Technologies" />
        </a>
        <nav>
          <a href="/#about">About</a>
          <a href="/#services">Services</a>
          <a href="/#products">Products</a>
          <a href="/#solutions">Solutions</a>
          <a href="/#industries">Industries</a>
          <a href="/#process">Approach</a>
          <a href="/#careers">Careers</a>
        </nav>
        <a className="nav-cta magnet" href="/#contact">Let's Talk <b>↗</b></a>
        <button type="button" className="menu" aria-label="Open menu"><i></i><i></i></button>
      </header>
      <div className="mobile-panel">
        <button type="button" className="close">×</button>
        <span>EXPLORE</span>
        <a href="/">Home</a>
        <a href="/#products">Products</a>
        <a href="/#contact">Contact</a>
      </div>
      <main id="product">
        {!product ? (
          <section className="product-hero">
            <div className="wrap product-missing">
              <p className="kicker">PRODUCTS</p>
              <h1>That product is not on this site.</h1>
              <Link className="btn primary" to="/#products">Back to products</Link>
            </div>
          </section>
        ) : (
          <>
            <section className="product-hero">
              <div className="wrap product-hero-grid">
                <div>
                  <p className="kicker">{product.index} / {product.kicker}</p>
                  <h1>{product.name}</h1>
                  <p className="product-lead">{product.lead}</p>
                  <div className="product-hero-actions">
                    <a className="btn primary magnet" href="/#contact">Talk about {product.name} <b>↗</b></a>
                    <Link className="btn ghost" to="/#products">All products</Link>
                  </div>
                </div>
                <div className="product-mark" aria-hidden="true">
                  <i></i>
                  <i></i>
                  <b>{product.mark}</b>
                  <small>{product.tagline}</small>
                </div>
              </div>
            </section>
            <section className="product-body">
              <div className="wrap">
                <p className="product-audience"><span>BUILT FOR</span> {product.audience}</p>
                <div className="product-points">
                  {product.points.map((point) => (
                    <article key={point.title}>
                      <h2>{point.title}</h2>
                      <p>{point.text}</p>
                    </article>
                  ))}
                </div>
                <ol className="product-steps">
                  {product.steps.map((step, index) => (
                    <li key={step}><span>0{index + 1}</span>{step}</li>
                  ))}
                </ol>
                <div className="product-more">
                  <h2>Other products</h2>
                  <div>
                    {products.filter((item) => item.slug !== product.slug).map((item) => (
                      <Link key={item.slug} to={`/products/${item.slug}`}>{item.name} <b>↗</b></Link>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
      <footer className="footer dark">
        <div className="wrap footer-main">
          <a href="/" className="logo" aria-label="Signin Technologies">
            <img src="/signin-logo.png" alt="Signin Technologies" />
          </a>
          <p>IT consulting and digital engineering for organizations ready to move forward.</p>
          <div>
            <small>PRODUCTS</small>
            {products.map((item) => (
              <Link key={item.slug} to={`/products/${item.slug}`}>{item.name}</Link>
            ))}
          </div>
          <div>
            <small>EXPLORE</small>
            <a href="/#about">About</a>
            <a href="/#services">Services</a>
            <a href="/#products">Products</a>
          </div>
          <div>
            <small>CONNECT</small>
            <a href="mailto:hello@signintechnologies.com">hello@signintechnologies.com</a>
            <a href="/#contact">Start a conversation</a>
          </div>
        </div>
        <div className="wrap footer-bottom">
          <span>© 2026 Signin Technologies LLC. All rights reserved.</span>
          <span>Privacy &nbsp; Terms</span>
        </div>
      </footer>
    </>
  )
}
