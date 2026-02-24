import './AnimatedHero.css'

const SPOTLIGHT_RADIUS = 140

export default function AnimatedHero({ mouseX = 0, mouseY = 0 }) {
  return (
    <div className="animated-hero" aria-hidden="true">
      <div className="animated-hero-img" />
      <div
        className="animated-hero-spotlight"
        style={{
          clipPath: `circle(${SPOTLIGHT_RADIUS}px at ${mouseX}px ${mouseY}px)`,
        }}
        aria-hidden="true"
      />
      <div className="animated-hero-bg" />
      <div className="animated-hero-shapes">
        <span className="shape shape-1" />
        <span className="shape shape-2" />
        <span className="shape shape-3" />
        <span className="shape shape-4" />
        <span className="shape shape-5" />
        <span className="shape shape-6" />
      </div>
    </div>
  )
}
