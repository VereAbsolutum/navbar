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
      crestNumber: 1,
      crestDelay: 300,
      waveDelay: 200,
      orientation: 'inverse',
      direction: 'v',
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

const colors = ['#ccc', 'blue', 'white']
const paths = document.querySelectorAll('path')
paths.forEach((path, i) => {
  path.style.fill = colors[i]
})
