// IMPLEMENTATION
/**
 *	Here you extract the OverlayAnimation class and the animation object from the Navkit
 *	to create the animation
 **/
const { animation, OverlayAnimation } = Navkit
const { animateIn, animateOut } = animation
/**
 *	And here you create a new instance of the OverlayAnimation.
 *	You can configure the animation here too.
 **/

/**
 * The animation params includes the duration and the wave configurations
 * **********************************************************************
 */
/** Duration
 * the duration is the time in milliseconds that the animation will run.
 * the total time of the animation will always be the duration plus the delays
 */
/** Waves
 * the waves param controls the shapes that the animation will take.
 * ** crestNumber: the number of crest the wave will have. [Default: 1...+]
 * ** crestDelay: it will change the amplitude of the waves. The greater the delay bigger the amplitude. [Default: 1...+]
 * ** orientation: it controls the from/to which side the animation will go. [Default: 'normal'/'inverse']
 * ** direction: you can change the direction by edit this param. [Default: 'v'/'h']
 * ** transitionTimingFunction: it will make the transition speed and acceleration change. [Default: linear, easeInOut]
 * ** crestAmplitudeFunction: it will change the shape of the waves. [Default: linear, random, sin, square]
 */
const nk = new OverlayAnimation({
  /** ***The props value is the params for the animeJS animation***
   *  You can console.log the props param to see every param of the object
   *  ***************************************************************/
  /**
   * The exit param executes the animation to close the menu.
   * You can change the value of the animation params here.
   * The example below add the skew(45deg) to the primaryNav
   */
  exit: animation.animateExit((props) => {
    Object.assign(props.primaryNav.props, { skew: [0, 45] })
  }),
  /**
   * The same goes to the enter param.
   * If you would like to change the offset value for the secondaryNav
   */
  enter: animation.animateEnter((props) => {
    Object.assign(props.secondaryNav, { offset: 1500 })
  }),
  animationProps: {
    duration: 600,
    svg: true,
    waves: {
      crestNumber: 80,
      crestDelay: 25,
      waveDelay: 100,
      orientation: 'normal',
      direction: 'h',
      transitionTimingFunction: 'easeInOut',
      crestAmplitudeFunction: 'square'
    }
  }
})
// OBS.: animateExit() must be placed always before the animateEnter()
/**
 *	Now you create an event-listener for the #toggle button to control the animation
 *	You need to extract the state from nk.stateMachine than create the condition to
 * 	not execute the animation if the animation is still running. And than execute the animation.
 **/
const btn = document.querySelector('#toggle')
/**
 * In this example the orientation will change accordantly to the animation state
 */
btn.addEventListener('click', () => {
  let { state } = nk.stateMachine
  let prop = {}
  if (state === 'open') {
    prop.orientation = 'inverse'
  } else {
    prop.orientation = 'normal'
  }
  nk.updateAnimationProps({ orientation: prop.orientation })
  if (state === 'transition') return
  nk.execute()
})
