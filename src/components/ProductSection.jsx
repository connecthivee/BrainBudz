import './ProductSection.css'

const PRODUCTS = [
  {
    id: 'alphabets',
    title: 'Wooden Alphabets',
    desc: 'Tactile letters for early literacy. Safe, chunky pieces that little hands love.',
    color: 'var(--brand-primary)',
  },
  {
    id: 'books',
    title: 'Tactile Books',
    desc: 'Storytime that engages touch and sight. Durable, beautiful, and designed for discovery.',
    color: 'var(--brand-highlight)',
  },
  {
    id: 'puzzles',
    title: 'Puzzle Boards',
    desc: 'First puzzles that build focus and fine motor skills. Natural wood, gentle challenge.',
    color: 'var(--brand-light)',
  },
  {
    id: 'counting',
    title: 'Counting Coins',
    desc: 'Real-world math readiness. Sort, stack, and count with satisfying, safe materials.',
    color: 'var(--brand-primary)',
  },
]

export default function ProductSection() {
  return (
    <section id="products" className="product-section">
      <div className="product-section-inner">
        <div className="product-grid">
          {PRODUCTS.map((product, i) => (
            <article
              key={product.id}
              className="product-card glass"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div
                className="product-card-accent"
                style={{ background: product.color }}
              />
              <h3 className="product-card-title">{product.title}</h3>
              <p className="product-card-desc">{product.desc}</p>
              <a href={`#${product.id}`} className="product-card-link">
                Learn more
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
