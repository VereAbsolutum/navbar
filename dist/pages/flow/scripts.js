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
    duration: 800,
    svg: true,
    waves: {
      crestNumber: 40,
      crestDelay: 300,
      waveDelay: 180,
      orientation: 'normal',
      direction: 'h',
      transitionTimingFunction: 'easeInOut',
      crestAmplitudeFunction: 'random'
    }
  }
})

const btn = document.querySelector('#toggle')
btn.addEventListener('click', () => {
  let { state } = nk.stateMachine
  if (state === 'transition') return
  nk.execute()
})

const colors = ['black', 'red', 'orange']
const paths = document.querySelectorAll('path')
paths.forEach((path, i) => {
  path.style.fill = colors[i]
})
