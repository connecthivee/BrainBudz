import { useState } from 'react'
import { useSectionSpotlight } from '../hooks/useSectionSpotlight'
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

export default function UserExperienceSection({ mouseX = 0, mouseY = 0 }) {
  const [sectionRef, spotlightStyle] = useSectionSpotlight(mouseX, mouseY)
  const [index, setIndex] = useState(0)
  const goPrev = () => setIndex((i) => Math.max(0, i - 1))
  const goNext = () => setIndex((i) => Math.min(TESTIMONIALS.length - 1, i + 1))
  return (
    <section id="user-experience" ref={sectionRef} className="user-experience-section">
      <div className="user-experience-section-bg" />
      {spotlightStyle && (
        <div
          className="user-experience-section-spotlight"
          style={spotlightStyle}
          aria-hidden="true"
        />
      )}
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
          <div className="user-experience-carousel-viewport">
            <div className="user-experience-carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>
              {TESTIMONIALS.map((t, i) => (
                <article key={i} className="user-experience-card">
                  <div className="user-experience-card-photo-wrap">
                    <img src={t.photo} alt={t.name} className="user-experience-card-photo" loading="lazy" />
                  </div>
                  <h3 className="user-experience-card-name">{t.name}</h3>
                  <p className="user-experience-card-comment">&ldquo;{t.comment}&rdquo;</p>
                </article>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="user-experience-carousel-arrow user-experience-carousel-arrow--next"
            onClick={goNext}
            disabled={index === TESTIMONIALS.length - 1}
            aria-label="Next"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
        <div className="user-experience-dots" aria-hidden="true">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`user-experience-dot ${i === index ? 'user-experience-dot--active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
