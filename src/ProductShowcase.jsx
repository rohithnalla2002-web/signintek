import { products } from './products'

export default function ProductShowcase() {
  return (
    <section id="products" className="products section dark">
      <div className="wrap">
        <div className="section-head split">
          <div>
            <div className="section-index">PRODUCTS</div>
            <h2>Platforms we <span>ship.</span></h2>
          </div>
          <p>Three products, three jobs: collect donations, answer with AI, and book event services. Each one has its own page.</p>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <a className="product-card" href={`/products/${product.slug}`} key={product.slug}>
              <small>{product.index} / {product.kicker}</small>
              <strong>{product.mark}</strong>
              <h3>{product.name}</h3>
              <p>{product.summary}</p>
              <b>Open product <span>↗</span></b>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
