import { useState } from 'react'
import { useSectionSpotlight } from '../hooks/useSectionSpotlight'
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

export default function ExpertsSection({ mouseX = 0, mouseY = 0 }) {
  const [sectionRef, spotlightStyle] = useSectionSpotlight(mouseX, mouseY)
  const [index, setIndex] = useState(0)
  const goPrev = () => setIndex((i) => Math.max(0, i - 1))
  const goNext = () => setIndex((i) => Math.min(EXPERTS.length - 1, i + 1))
  return (
    <section id="experts" ref={sectionRef} className="experts-section">
      <div className="experts-section-bg" />
      {spotlightStyle && (
        <div
          className="experts-section-spotlight"
          style={spotlightStyle}
          aria-hidden="true"
        />
      )}
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
          <div className="experts-carousel-viewport">
            <div className="experts-carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>
              {EXPERTS.map((expert, i) => (
                <article key={i} className="expert-card">
                  <div className="expert-card-image-wrap">
                    <img src={expert.image} alt={expert.name} className="expert-card-image" loading="lazy" />
                  </div>
                  <h3 className="expert-card-name">{expert.name}</h3>
                  <p className="expert-card-role">{expert.role}</p>
                  <p className="expert-card-experience">{expert.experience}</p>
                </article>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="experts-carousel-arrow experts-carousel-arrow--next"
            onClick={goNext}
            disabled={index === EXPERTS.length - 1}
            aria-label="Next expert"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
        <div className="experts-dots" aria-hidden="true">
          {EXPERTS.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`experts-dot ${i === index ? 'experts-dot--active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Go to expert ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
