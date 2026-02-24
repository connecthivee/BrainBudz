import { useState } from 'react'
import { useSectionSpotlight } from '../hooks/useSectionSpotlight'
import './BooksSection.css'

const AMAZON_BASE = 'https://www.amazon.in/s?i=stripbooks&rh=p_27%3ABrainBudz%2BLearning%2BSolutions&ref=dp_byline_sr_book_1'

const WHATSAPP_NUMBER = '917008310868'
const whatsAppUrl = (text = '') =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`

const MY_SENSES_IMAGES = [
  '/pic/my-senses-learning/61DPxbZnmuL._SL1500_.jpg',
  '/pic/my-senses-learning/713nWZsIpiL._SL1500_.jpg',
  '/pic/my-senses-learning/7160dptI4hL._SL1500_.jpg',
  '/pic/my-senses-learning/71gpGA52+NL._SL1500_.jpg',
]

const MY_SENSES_AMAZON = 'https://www.amazon.in/Learning-Hearing-Picture-Based-Interactive-Preschool/dp/B0GJQMCV1X'

const YES_NO_IMAGES = [
  '/pic/learning-cards/611Ugd5wiQL._SL1500_.jpg',
  '/pic/learning-cards/616VVtz+DbL._SL1500_.jpg',
  '/pic/learning-cards/61LBQoCjZ5L._SL1024_.jpg',
]

const YES_NO_AMAZON = 'https://www.amazon.in/Decision-Making-Activities-Picture-Based-Cognitive-Development/dp/B0GLF5VKGD'

const PREPOSITIONS_IMAGES = [
  '/pic/easy-for-kids/61LrgbiYYQL._SL1500_.jpg',
  '/pic/easy-for-kids/61PfLd3CiwL._SL1500_.jpg',
  '/pic/easy-for-kids/61kVDxwnFYL._SL1500_.jpg',
  '/pic/easy-for-kids/710hAl-OjCL._SL1500_.jpg',
]

const PREPOSITIONS_AMAZON = 'https://www.amazon.in/Prepositions-Placement-Activities-Picture-Based-Learning/dp/B0GJLP93WS'

const WORKBOOK_IMAGES = [
  '/pic/workbook/61A--dXEMNL._SL1500_.jpg',
  '/pic/workbook/61PlgdPvdBL._SL1500_.jpg',
  '/pic/workbook/61yIunlLaGL._SL1500_.jpg',
]

const WORKBOOK_AMAZON = 'https://www.amazon.in/Community-Workbook-Picture-Based-Learning-Awareness/dp/B0GH2345R4'

const FOOD_PLATE_IMAGES = [
  '/pic/activity-book/61P6MtvWLtL._SL1500_.jpg',
  '/pic/activity-book/61S8i7rQFuL._SL1500_.jpg',
  '/pic/activity-book/61Zlu1ZHDrL._SL1024_.jpg',
]

const FOOD_PLATE_AMAZON = 'https://www.amazon.in/Activity-Balanced-Activities-Picture-Based-Nutrition/dp/B0GK92GQFX'

const FESTIVALS_IMAGES = [
  '/pic/festival/61MZNLuTANL._SL1500_.jpg',
  '/pic/festival/61tnOmO4VTL._SL1280_.jpg',
  '/pic/festival/713kCrPA0EL._SL1500_.jpg',
  '/pic/festival/71Ps7wP1cPL._SL1500_.jpg',
]

const FESTIVALS_AMAZON = 'https://www.amazon.in/Indian-Festivals-Kids-Interactive-Educational/dp/B0GF244C5K'

const BOOKS = [
  {
    id: 'my-senses',
    title: 'My Senses',
    description: 'My Senses Learning Card Book for Kids | Five Senses Early Learning Book (Sight, Hearing, Smell, Taste & Touch) | Picture-Based Interactive Card Book | Preschool & Toddler Learning | (Ages 2–7)',
    ages: '2–7 years',
    price: '₹625',
    link: MY_SENSES_AMAZON,
    images: MY_SENSES_IMAGES,
  },
  {
    id: 'yes-no',
    title: 'My Yes or No Learning Cards',
    description: 'My Yes or No Learning Cards for Kids (Age 2–7 Years) | YES & NO Visual Decision-Making Activities | Picture-Based Early Learning Card Book | Cognitive Development & Basic Concepts Practice',
    ages: '2–7 years',
    price: '₹525',
    link: YES_NO_AMAZON,
    images: YES_NO_IMAGES,
  },
  {
    id: 'prepositions',
    title: 'Prepositions Made Easy',
    description: 'Prepositions Made Easy for Kids (Ages 2–7) | Learn IN, ON & UNDER with Object Placement Activities | Picture-Based English Learning Card Book | Early Grammar',
    ages: '2–7 years',
    price: '₹625',
    link: PREPOSITIONS_AMAZON,
    images: PREPOSITIONS_IMAGES,
  },
  {
    id: 'helpers',
    title: 'Community Helpers Workbook',
    description: 'Community Helpers Workbook (Ages 2–6) | Picture-Based Learning of Everyday Helpers | Visual Learning & Early Awareness Skills | 15 Pages',
    ages: '2–6 years',
    price: '₹649',
    link: WORKBOOK_AMAZON,
    images: WORKBOOK_IMAGES,
  },
  {
    id: 'food-plate',
    title: 'My Food Plate Activity Book',
    description: 'My Food Plate Activity Book for Kids (Ages 2–7) | Learn Food Groups & Healthy Eating | Balanced Meal Building Activities | Picture-Based Nutrition ... | Early Life Skills & Healthy Habits Workbook',
    ages: '2–7 years',
    price: '₹605',
    link: FOOD_PLATE_AMAZON,
    images: FOOD_PLATE_IMAGES,
  },
  {
    id: 'festivals',
    title: 'Indian Festivals for Kids',
    description: 'Indian Festivals for Kids – Interactive Velcro Activity Learning Book | Ages 2–10 | Unisex Educational Book | (2024)',
    ages: '2–10 years',
    price: '₹625',
    link: FESTIVALS_AMAZON,
    images: FESTIVALS_IMAGES,
  },
]

const DESCRIPTION_TRUNCATE_LEN = 80

function BookCardWithGallery({ book }) {
  const [imgIndex, setImgIndex] = useState(0)
  const [readMore, setReadMore] = useState(false)
  const next = () => setImgIndex((i) => (i + 1) % book.images.length)
  const prev = () => setImgIndex((i) => (i - 1 + book.images.length) % book.images.length)
  const isLong = book.description.length > DESCRIPTION_TRUNCATE_LEN
  const showDesc = readMore ? book.description : (isLong ? book.description.slice(0, DESCRIPTION_TRUNCATE_LEN) + '…' : book.description)

  return (
    <article className="book-card book-card--playful book-card--small">
      <div className="book-card-image-wrap book-card-image-wrap--gallery">
        <img
          src={book.images[imgIndex]}
          alt={`${book.title} ${imgIndex + 1}`}
          className="book-card-image"
          loading="lazy"
        />
        {book.images.length > 1 && (
          <>
            <button type="button" className="book-card-gallery-btn book-card-gallery-btn--prev" onClick={prev} aria-label="Previous image" />
            <button type="button" className="book-card-gallery-btn book-card-gallery-btn--next" onClick={next} aria-label="Next image" />
            <div className="book-card-gallery-dots">
              {book.images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`book-card-gallery-dot ${i === imgIndex ? 'active' : ''}`}
                  onClick={() => setImgIndex(i)}
                  aria-label={`Image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="book-card-body">
        <h3 className="book-card-title">{book.title}</h3>
        <p className={`book-card-description ${isLong ? 'book-card-description--expandable' : ''}`}>
          {showDesc}
          {isLong && (
            <button type="button" className="book-card-read-more" onClick={() => setReadMore(!readMore)}>
              {readMore ? ' Read less' : ' Read more'}
            </button>
          )}
        </p>
        <p className="book-card-ages">Ages {book.ages}</p>
        <div className="book-card-actions">
          <a href={whatsAppUrl(`Hi, I'm interested in "${book.title}". ${book.link}`)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
            WhatsApp
          </a>
          <a href={book.link} target="_blank" rel="noopener noreferrer" className="btn btn-amazon">
            View on Amazon
          </a>
        </div>
      </div>
    </article>
  )
}

function BookCardDefault({ book }) {
  return (
    <article className="book-card book-card--playful book-card--small">
      <div className="book-card-image-wrap">
        <img src={book.image} alt={book.title} className="book-card-image" loading="lazy" />
      </div>
      <div className="book-card-body">
        <h3 className="book-card-title">{book.title}</h3>
        <p className="book-card-description">{book.description}</p>
        <p className="book-card-ages">Ages {book.ages}</p>
        <div className="book-card-actions">
          <a href={whatsAppUrl(`Hi, I'm interested in "${book.title}". ${book.link}`)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
            WhatsApp
          </a>
          <a href={book.link} target="_blank" rel="noopener noreferrer" className="btn btn-amazon">
            View on Amazon
          </a>
        </div>
      </div>
    </article>
  )
}

export default function BooksSection({ mouseX = 0, mouseY = 0 }) {
  const [sectionRef, spotlightStyle] = useSectionSpotlight(mouseX, mouseY)
  return (
    <section id="books" ref={sectionRef} className="books-section">
      <div className="books-section-bg" />
      {spotlightStyle && (
        <div
          className="books-section-spotlight"
          style={spotlightStyle}
          aria-hidden="true"
        />
      )}
      <div className="books-section-inner">
        <h2 className="books-section-title">Our Learning Books</h2>
        <p className="books-section-desc">
          By BrainBudz Learning Solutions — picture-based, interactive books for ages 2–10.
        </p>
        <div className="books-grid">
          {BOOKS.map((book) =>
            book.images ? (
              <BookCardWithGallery key={book.id} book={book} />
            ) : (
              <BookCardDefault key={book.id} book={book} />
            )
          )}
        </div>
        <a href={AMAZON_BASE} target="_blank" rel="noopener noreferrer" className="books-view-all">
          View all books on Amazon →
        </a>
      </div>
    </section>
  )
}
