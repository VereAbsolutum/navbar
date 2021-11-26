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
