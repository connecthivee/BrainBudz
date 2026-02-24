import { useCarouselScroll } from '../hooks/useCarouselScroll'
import './UserExperienceSection.css'

const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') + '/'

const TESTIMONIALS = [
  {
    name: 'Priya M.',
    comment: 'My daughter loves the My Senses card book. The pictures are clear and she has started naming senses on her own. Great for ages 2–5.',
    photo: `${base}pic/hero/family.png`,
  },
  {
    name: 'Rahul K.',
    comment: 'We use the Prepositions and Community Helpers books at home. Simple, colourful, and my son actually asks for them. Highly recommend.',
    photo: `${base}pic/hero/kids.png`,
  },
  {
    name: 'Anita S.',
    comment: 'The Indian Festivals book is perfect for our preschool. Kids enjoy the velcro activities and we use it every month for different festivals.',
    photo: `${base}pic/hero/kidcare.png`,
  },
]

export default function UserExperienceSection() {
  const {
    viewportRef,
    index,
    goPrev,
    goNext,
    goToPage,
    totalPages,
    activePage,
    trackWidthPercent,
    totalItems,
    maxIndex,
  } = useCarouselScroll(TESTIMONIALS.length)

  return (
    <section id="user-experience" className="user-experience-section">
      <div className="user-experience-section-bg" />
      <div className="user-experience-inner">
        <h2 className="user-experience-title">User Experience</h2>
        <p className="user-experience-desc">
          What parents and educators say about our learning books.
        </p>
        <div className="user-experience-carousel">
          <button
            type="button"
            className="user-experience-carousel-arrow user-experience-carousel-arrow--prev"
            onClick={goPrev}
            disabled={index === 0}
            aria-label="Previous"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <div
            ref={viewportRef}
            className="user-experience-carousel-viewport"
            role="region"
            aria-label="Testimonials carousel"
          >
            <div
              className="user-experience-carousel-track"
              style={{
                width: `${totalItems * trackWidthPercent}%`,
                ['--carousel-slots']: totalItems,
              }}
            >
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="user-experience-carousel-slot">
                  <article className="user-experience-card">
                    <div className="user-experience-card-photo-wrap">
                      <img src={t.photo} alt={t.name} className="user-experience-card-photo" loading="lazy" />
                    </div>
                    <h3 className="user-experience-card-name">{t.name}</h3>
                    <p className="user-experience-card-comment">&ldquo;{t.comment}&rdquo;</p>
                  </article>
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="user-experience-carousel-arrow user-experience-carousel-arrow--next"
            onClick={goNext}
            disabled={index === maxIndex}
            aria-label="Next"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
        <div className="user-experience-dots" aria-hidden="true">
          {Array.from({ length: totalPages }, (_, p) => (
            <button
              key={p}
              type="button"
              className={`user-experience-dot ${p === activePage ? 'user-experience-dot--active' : ''}`}
              onClick={() => goToPage(p)}
              aria-label={`Go to page ${p + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
