import { useSectionSpotlight } from '../hooks/useSectionSpotlight'
import './Footer.css'

const logoImg = new URL('../../pic/logo.png', import.meta.url).href

export default function Footer({ mouseX = 0, mouseY = 0 }) {
  const [sectionRef, spotlightStyle] = useSectionSpotlight(mouseX, mouseY)
  return (
    <footer id="footer" ref={sectionRef} className="site-footer">
      <div className="site-footer-bg" />
      {spotlightStyle && (
        <div
          className="site-footer-spotlight"
          style={spotlightStyle}
          aria-hidden="true"
        />
      )}
      <div className="site-footer-inner">
        <a href="/" className="site-footer-logo">
          <img src={logoImg} alt="BrainBudz Learning Solutions" className="site-footer-logo-img" />
        </a>
        <address className="site-footer-address">
          BrainBudz Learning Solutions<br />
          Delhi NCR, India
        </address>
      </div>
    </footer>
  )
}
