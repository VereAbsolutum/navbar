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
      crestNumber: 50,
      crestDelay: 40,
      waveDelay: 100,
      orientation: 'inverse',
      direction: 'h',
      transitionTimingFunction: 'easeInOut',
      crestAmplitudeFunction: 'square'
    }
  }
})

const btn = document.querySelector('#toggle')
btn.addEventListener('click', () => {
  let { state } = nk.stateMachine
  if (state === 'transition') return
  nk.execute()
})

const colors = ['white', 'black', '#c3c3c4']
const paths = document.querySelectorAll('path')
paths.forEach((path, i) => {
  path.style.fill = colors[i]
})
