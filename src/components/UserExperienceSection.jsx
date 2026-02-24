import { useSectionSpotlight } from '../hooks/useSectionSpotlight'
import './UserExperienceSection.css'

const TESTIMONIALS = [
  {
    name: 'Priya M.',
    comment: 'My daughter loves the My Senses card book. The pictures are clear and she has started naming senses on her own. Great for ages 2–5.',
    photo: '/pic/hero/family.png',
  },
  {
    name: 'Rahul K.',
    comment: 'We use the Prepositions and Community Helpers books at home. Simple, colourful, and my son actually asks for them. Highly recommend.',
    photo: '/pic/hero/kids.png',
  },
  {
    name: 'Anita S.',
    comment: 'The Indian Festivals book is perfect for our preschool. Kids enjoy the velcro activities and we use it every month for different festivals.',
    photo: '/pic/hero/kidcare.png',
  },
]

export default function UserExperienceSection({ mouseX = 0, mouseY = 0 }) {
  const [sectionRef, spotlightStyle] = useSectionSpotlight(mouseX, mouseY)
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
        <div className="user-experience-grid">
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
    </section>
  )
}
