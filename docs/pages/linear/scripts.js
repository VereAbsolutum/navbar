// IMPLEMENTATION
const { animation, OverlayAnimation } = Navkit
const { animateIn, animateOut } = animation

const nk = new OverlayAnimation({
  exit: animation.animateExit(),
  enter: animation.animateEnter((enterState) => {
    Object.assign(enterState.primaryNav, { offset: 1000 })
    return enterState
  }),
  animationProps: {
    duration: 1000,
    svg: true,
    waves: {
      crestNumber: 1,
      crestDelay: 1,
      waveDelay: 100,
      orientation: 'inverse',
      direction: 'h',
      transitionTimingFunction: 'easeInOut',
      crestAmplitudeFunction: 'linear'
    }
  }
})

const btn = document.querySelector('#toggle')
btn.addEventListener('click', () => {
  let { state } = nk.stateMachine
  if (state === 'transition') return
  nk.execute()
})

const colors = ['black', 'white', 'black', 'white', 'black', 'white']
const paths = document.querySelectorAll('path')
paths.forEach((path, i) => {
  path.style.fill = colors[i]
})

// CARROUSEL

// SELECTORS
const SELECTOR_CARROUSEL = '#carrousel'
const SELECTOR_CARROUSEL_BTN_LEFT = '#carrousel-btn-left'
const SELECTOR_CARROUSEL_BTN_RIGHT = '#carrousel-btn-right'
const SELECTOR_CARROUSEL_TRACK = '#carrousel-track'
const SELECTOR_CARROUSEL_NAV = '#carrousel-nav'
const SELECTOR_CURRENT_SLIDE = '.current-slide'

// CLASSES
const CLASS_CURRENT_SLIDE = 'current-slide'
const CLASS_CARROUSEL_INDICATOR = 'carrousel__indicator'

// DOM ELEMENTS
const carrouselBtnLeft = document.querySelector(SELECTOR_CARROUSEL_BTN_LEFT)
const carrouselBtnRight = document.querySelector(SELECTOR_CARROUSEL_BTN_RIGHT)
const carrouselTrack = document.querySelector(SELECTOR_CARROUSEL_TRACK)
const carrouselNav = document.querySelector(SELECTOR_CARROUSEL_NAV)
const carrouselSlides = Array.from(carrouselTrack.querySelectorAll('LI'))
const carrouselIndicators = Array.from(carrouselNav.querySelectorAll('BUTTON'))

// IMPLEMENTATION
const slideWidth = 780
carrouselSlides[0].classList.add(CLASS_CURRENT_SLIDE)
carrouselIndicators[0].classList.add(CLASS_CURRENT_SLIDE)
carrouselBtnLeft.style.display = 'none'

const setSlidePosition = (slide, index) => {
  slide.style.left = `${slideWidth * index}px`
}
carrouselSlides.forEach(setSlidePosition)

const moveToSlide = (carrouselTrack, currentSlide, target) => {
  carrouselTrack.style.transform = `translateX(-${target.style.left})`
  currentSlide.classList.remove(CLASS_CURRENT_SLIDE)
  target.classList.add(CLASS_CURRENT_SLIDE)
}

const updateIndicator = (currentIndicator, targetIndicator) => {
  currentIndicator.classList.remove(CLASS_CURRENT_SLIDE)
  targetIndicator.classList.add(CLASS_CURRENT_SLIDE)
}

const handlesArrowsDisplay = (
  carrouselSlides,
  carrouselBtnRight,
  carrouselBtnLeft,
  targetIndicatorIndex
) => {
  if (targetIndicatorIndex === 0) {
    carrouselBtnLeft.style.display = 'none'
    carrouselBtnRight.style.display = 'flex'
  } else if (targetIndicatorIndex === carrouselSlides.length - 1) {
    carrouselBtnLeft.style.display = 'flex'
    carrouselBtnRight.style.display = 'none'
  } else {
    carrouselBtnLeft.style.display = 'flex'
    carrouselBtnRight.style.display = 'flex'
  }
}

carrouselBtnRight.addEventListener('click', () => {
  const currentSlide = carrouselTrack.querySelector(SELECTOR_CURRENT_SLIDE)
  const nextSlide = currentSlide.nextElementSibling
  const currentIndicator = carrouselNav.querySelector(SELECTOR_CURRENT_SLIDE)
  const nextIndicator = currentIndicator.nextElementSibling
  const carrouselSlideIndex = carrouselSlides.findIndex(
    (slide) => slide === nextSlide
  )
  moveToSlide(carrouselTrack, currentSlide, nextSlide)
  updateIndicator(currentIndicator, nextIndicator)
  handlesArrowsDisplay(
    carrouselSlides,
    carrouselBtnRight,
    carrouselBtnLeft,
    carrouselSlideIndex
  )
})

carrouselBtnLeft.addEventListener('click', () => {
  const currentSlide = carrouselTrack.querySelector(SELECTOR_CURRENT_SLIDE)
  const previousSlide = currentSlide.previousElementSibling
  const currentIndicator = carrouselNav.querySelector(SELECTOR_CURRENT_SLIDE)
  const previousIndicator = currentIndicator.previousElementSibling
  const carrouselSlideIndex = carrouselSlides.findIndex(
    (slide) => slide === previousSlide
  )
  moveToSlide(carrouselTrack, currentSlide, previousSlide)
  updateIndicator(currentIndicator, previousIndicator)
  handlesArrowsDisplay(
    carrouselSlides,
    carrouselBtnRight,
    carrouselBtnLeft,
    carrouselSlideIndex
  )
})

carrouselNav.addEventListener('click', (e) => {
  const clickedIndicator = e.target

  if (!clickedIndicator.classList.contains(CLASS_CARROUSEL_INDICATOR)) return

  const currentSlide = carrouselTrack.querySelector(SELECTOR_CURRENT_SLIDE)
  const currentIndicator = carrouselNav.querySelector(SELECTOR_CURRENT_SLIDE)
  const targetIndicatorIndex = carrouselIndicators.findIndex(
    (carrouselIndicator) => carrouselIndicator === clickedIndicator
  )
  const targetSlide = carrouselSlides[targetIndicatorIndex]

  moveToSlide(carrouselTrack, currentSlide, targetSlide)
  updateIndicator(currentIndicator, clickedIndicator)
  handlesArrowsDisplay(
    carrouselSlides,
    carrouselBtnRight,
    carrouselBtnLeft,
    targetIndicatorIndex
  )
})
