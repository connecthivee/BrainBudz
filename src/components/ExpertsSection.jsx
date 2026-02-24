import { useCarouselScroll } from '../hooks/useCarouselScroll'
import './ExpertsSection.css'

const EXPERTS = [
  {
    name: 'Priya Sharma',
    role: 'Lead Educator',
    experience: '8+ years in early childhood education and picture-based learning design.',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Rahul Verma',
    role: 'Content Creator',
    experience: 'Specialises in interactive card books and sensory learning for ages 2–7.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Anita Krishnan',
    role: 'Curriculum Designer',
    experience: 'Designs grammar, prepositions, and festival-based learning activities.',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    name: 'Suresh Patel',
    role: 'Early Learning Specialist',
    experience: 'Focus on senses, nutrition, and community helpers workbooks for toddlers.',
    image: 'https://randomuser.me/api/portraits/men/67.jpg',
  },
  {
    name: 'Meera Nair',
    role: 'Educational Illustrator',
    experience: 'Creates picture-based and velcro activity content for Indian festivals and themes.',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
]

export default function ExpertsSection() {
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
  } = useCarouselScroll(EXPERTS.length)

  return (
    <section id="experts" className="experts-section">
      <div className="experts-section-bg" />
      <div className="experts-section-inner">
        <h2 className="experts-section-title">Our Experts</h2>
        <p className="experts-section-desc">
          Our team of educators and content creators design picture-based learning materials for children ages 2–10.
        </p>
        <div className="experts-carousel">
          <button
            type="button"
            className="experts-carousel-arrow experts-carousel-arrow--prev"
            onClick={goPrev}
            disabled={index === 0}
            aria-label="Previous expert"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <div
            ref={viewportRef}
            className="experts-carousel-viewport"
            role="region"
            aria-label="Experts carousel"
          >
            <div
              className="experts-carousel-track"
              style={{
                width: `${totalItems * trackWidthPercent}%`,
                ['--carousel-slots']: totalItems,
              }}
            >
              {EXPERTS.map((expert, i) => (
                <div key={i} className="experts-carousel-slot">
                  <article className="expert-card">
                    <div className="expert-card-image-wrap">
                      <img src={expert.image} alt={expert.name} className="expert-card-image" loading="lazy" />
                    </div>
                    <h3 className="expert-card-name">{expert.name}</h3>
                    <p className="expert-card-role">{expert.role}</p>
                    <p className="expert-card-experience">{expert.experience}</p>
                  </article>
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="experts-carousel-arrow experts-carousel-arrow--next"
            onClick={goNext}
            disabled={index === maxIndex}
            aria-label="Next expert"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
        <div className="experts-dots" aria-hidden="true">
          {Array.from({ length: totalPages }, (_, p) => (
            <button
              key={p}
              type="button"
              className={`experts-dot ${p === activePage ? 'experts-dot--active' : ''}`}
              onClick={() => goToPage(p)}
              aria-label={`Go to page ${p + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
