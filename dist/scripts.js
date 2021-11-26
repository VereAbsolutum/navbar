// IMPLEMENTATION

const { animation, OverlayAnimation } = Navkit
const { animateIn, animateOut } = animation

const nk = new OverlayAnimation({
  enter: animation.animateIn(),
  exit: animation.animateOut(),
  animationProps: {
    duration: 600,
    svg: true,
    waves: {
      crestNumber: 80,
      crestDelay: 100,
      waveDelay: 100,
      orientation: 'normal',
      direction: 'h',
      transitionTimingFunction: 'linear',
      crestAmplitudeFunction: 'square'
    }
  }
})

const btn = document.querySelector('#toggle')

btn.addEventListener('click', () => {
  let { state } = nk.stateMachine
  if (state === 'transition') return
  console.log('nk')
  let prop = {}
  if (Math.random() < 0.5 || Math.random() > 0.75) {
    prop.direction = 'h'
    prop.orientation = 'normal'
    prop.crestNumber = Math.trunc(Math.random() * 100 + 1)
    prop.crestAmplitudeFunction = 'sin'
  } else {
    prop.direction = 'v'
    prop.orientation = 'inverse'
    prop.crestNumber = Math.trunc(Math.random() * 50 + 1)
    prop.crestAmplitudeFunction = 'square'
  }
  nk.updateAnimationProps({
    direction: prop.direction,
    orientation: prop.orientation,
    crestNumber: prop.crestNumber,
    crestAmplitudeFunction: prop.crestAmplitudeFunction
  })
  nk.execute()
})
