/**
 * App Module
 * @module /src/scripts/index.js
 *
 * @author [VereAbsolutum]
 * @email [sergiopile3@fmail.com]
 * @version 1.0.0
 * @create date 2021-11-16 21:19:28
 * @modify date 2021-11-24 20:36:20
 * @description This module creates the shapes of the SVG animation. You can use the object assign to the window object called Navkit
 * and than use the class OverlayAnimation object to set the parameters for the animation.
 */

'use strict'

import 'core-js/modules/es.array.for-each'
import 'core-js/modules/es.object.assign'

/**
 * @constant {number} animeJSDuration animeJSDuration is used with the AnimeJS object
 */
const animeJSDuration = 1000

/** @constant {number} SVG_WIDTH It is the value for the svg size */
const SVG_WIDTH = 100

/** @constant {String} EASE_IN_OUT Easing function name used to control the velocity of the animation */
const EASE_IN_OUT = 'easeInOut'

/** @constant {String} FUNCTION_NAME_RANDOM Easing function name used to control the velocity of the animation */
const FUNCTION_NAME_RANDOM = 'random'

/** @constant {String} DIRECTION_HORIZONTALDefine the animation direction to horizontal */
const DIRECTION_HORIZONTAL = 'h'
/** @constant {String} DIRECTION_VERTICAL Define the animation direction to vertical */
const DIRECTION_VERTICAL = 'v'
/** @constant {String} ORIENTATION_INVERSE It inverts the orientation of the animation */
const ORIENTATION_INVERSE = 'inverse'

/** @constant {String} STATUS_CLOSED The status of the animation [CLOSED] */
const STATUS_CLOSED = 'closed'
/** @constant {String} STATUS_OPENED The status of the animation [CLOSED] */
const STATUS_OPENED = 'opened'

/** CLASS NAMES */
/** @constant {string} CLASS_VISIBLE Class name used to set the visibility */
const CLASS_VISIBLE = 'visible'
/** @constant {string} CLASS_IS_OPENED Class name used to indicate status of the HTMLElement as opened */
const CLASS_IS_OPENED = 'is-opened'
/** @constant {string} CLASS_IS_CLOSED Class name used to indicate status of the HTMLElement as closed */
const CLASS_IS_CLOSED = 'is-closed'
/** @constant {string} CLASS_IS_TRANSITIONING Class name used to indicate status of the HTMLElement as transitioning */
const CLASS_IS_TRANSITIONING = 'is-transitioning'

/** SELECTORS */
/** @constant {string} SELECTOR_HEADER Selector name for the header element */
const SELECTOR_HEADER = '#header'
/** @constant {string} SELECTOR_OVERLAY_TRANSITION Selector name for the overlay-transition element */
const SELECTOR_OVERLAY_TRANSITION = '#overlay-transition'
/** @constant {string} SELECTOR_TOGGLE_LABEL_CLOSE Selector name for the toggle__close element */
const SELECTOR_TOGGLE_LABEL_CLOSE = '.toggle__close'
/** @constant {string} SELECTOR_TOGGLE_LABEL_OPEN Selector name for the toggle__open element */
const SELECTOR_TOGGLE_LABEL_OPEN = '.toggle__open'
/** @constant {string} SELECTOR_OVERLAY_PRIMARY_LIST Selector name for the primary-nav__list elements */
const SELECTOR_OVERLAY_PRIMARY_LIST = '.primary-nav__list'
/** @constant {string} SELECTOR_OVERLAY_SECONDARY_LINK Selector name for the secondary-nav__link elements */
const SELECTOR_OVERLAY_SECONDARY_LINK = '.secondary-nav__link'

/** DOM ELEMENTS */
/** @constant {HTMLElement} header HTML element from the DOM */
const header = document.querySelector(SELECTOR_HEADER)
/** @constant {HTMLElement} overlayTransition HTML element from the DOM */
const overlayTransition = document.querySelector(SELECTOR_OVERLAY_TRANSITION)
/** @constant {HTMLElement} overlayBg HTML element from the DOM */
const overlayBg = document.querySelector('#overlay-transition')
/** @constant {HTMLElement} paths HTML element from the DOM */
const paths = overlayBg.querySelectorAll('path')

// HELPERS
/**
 * The invertOrientation function will receive a value from array of amplitudes and returns
 * a subtraction of the SVG size and the array value. The intention is to invert the orientation
 * of the amplitudes
 * @param {Number} x - the value of the control point in a time
 * @return {Number} - the new value of the control after inversion
 */
function invertOrientation(x) {
  return 100 - x
}

/**
 * A function used to smoothie the curve of the control points used in the svg PATH
 * to create the shapes of the animation
 * Available easing functions: [
 * - easeIn
 * - easeOut
 * - easeInOut
 * - linear
 * ]
 * @param {String} easingName - the name of the function to be used
 * @param {Number} x - the time
 * @return {Number} - the position (control point) in that time
 */
function easingFn(easingName, x) {
  return {
    easeIn: x == 0.0 ? x : Math.pow(2.0, 10.0 * (x - 1.0)),
    easeOut: x == 1.0 ? x : 1.0 - Math.pow(2.0, -10.0 * x),
    easeInOut:
      x < 0.5 ? 4.0 * Math.pow(x, 3) : 0.5 * Math.pow(2.0 * x - 2.0, 3.0) + 1.0,
    linear: x
  }[easingName]
}

/** ******************************************************************************************************
 *  ANIMEJS OBJECTS
 *  ******************************************************************************************************/

/**
 * animeProps is an object of objects.
 * This objects is used to set the value of anime() function from the AnimeJS
 * Available objects: {
 * - timeline
 * - primaryNav
 * - secondaryNav
 * - toggleLabelClose
 * - toggleLabelOpen
 *
 * }
 * @constant {object} */
const animeProps = {
  timeline: {
    autoplay: false,
    loop: false,
    duration: animeJSDuration
  },
  exit: {
    primaryNav: {
      props: {
        targets: SELECTOR_OVERLAY_PRIMARY_LIST,
        translateX: ['0px', '-200px'],
        opacity: ['1', '0'],
        easing: 'easeInOutSine',
        duration: 300,
        delay: anime.stagger(100, { from: 'first' })
      },
      offset: 0
    },
    secondaryNav: {
      props: {
        targets: SELECTOR_OVERLAY_SECONDARY_LINK,
        translateX: ['0px', '-200px'],
        opacity: ['1', '0'],
        easing: 'easeInOutSine',
        duration: 300,
        delay: anime.stagger(100, { from: 'first' })
      },
      offset: 0
    },
    toggleLabelClose: {
      props: {
        targets: SELECTOR_TOGGLE_LABEL_CLOSE,
        left: 0,
        opacity: 0,
        easing: 'easeInOutSine',
        duration: 300
      },
      offset: 0
    },
    toggleLabelOpen: {
      props: {
        targets: SELECTOR_TOGGLE_LABEL_OPEN,
        left: -90,
        opacity: 1,
        easing: 'easeInOutSine',
        duration: 300
      },
      offset: 0
    }
  },
  enter: {
    primaryNav: {
      props: {
        targets: SELECTOR_OVERLAY_PRIMARY_LIST,
        translateX: ['200px', '0px'],
        opacity: ['0', '1'],
        easing: 'easeInOutSine',
        duration: 500,
        delay: anime.stagger(100, { from: 'first' })
      },
      offset: animeJSDuration - 100
    },
    secondaryNav: {
      props: {
        targets: SELECTOR_OVERLAY_SECONDARY_LINK,
        translateX: ['200px', '0px'],
        opacity: ['0', '1'],
        easing: 'easeInOutSine',
        duration: 500,
        delay: anime.stagger(100, { from: 'first' })
      },
      offset: animeJSDuration - 100
    },
    toggleLabelClose: {
      props: {
        targets: SELECTOR_TOGGLE_LABEL_CLOSE,
        left: -90,
        opacity: 1,
        easing: 'easeInOutSine',
        duration: 300
      },
      offset: 0
    },
    toggleLabelOpen: {
      props: {
        targets: SELECTOR_TOGGLE_LABEL_OPEN,
        left: 0,
        opacity: 0,
        easing: 'easeInOutSine',
        duration: 300
      },
      offset: 0
    }
  }
}

/**
 * The animateExit function expect a callback function, if not provide it runs with default values for the animation
 * This function execute a timeline function from AnimeJS API.
 * @param {Function} callback - () => AnimeJS enter object
 * @return {Object} - AnimeJS object
 */
const animateExit = (callback) => {
  let props = animeProps
  let properties
  if (callback) {
    properties = callback(animeProps.exit)
    Object.assign(props.enter, properties)
  }

  return anime
    .timeline(props.timeline)
    .add(props.exit.primaryNav.props, props.exit.primaryNav.offset)
    .add(props.exit.secondaryNav.props, props.exit.secondaryNav.offset)
    .add(props.exit.toggleLabelClose.props, props.exit.toggleLabelClose.offset)
    .add(props.exit.toggleLabelOpen.props, props.exit.toggleLabelOpen.offset)
}

/**
 * The animateEnter function expect a callback function, if not provide it runs with default values for the animation
 * This function execute a timeline function from AnimeJS API.
 * @param {Function} callback - () => AnimeJS enter object
 * @return {Object} - AnimeJS object
 */
const animateEnter = (callback) => {
  let prop = animeProps
  let properties
  if (callback) {
    properties = callback(animeProps.enter)
    Object.assign(prop.enter, properties)
  }
  return anime
    .timeline(prop.timeline)
    .add(prop.enter.primaryNav.props, prop.enter.primaryNav.offset)
    .add(prop.enter.secondaryNav.props, prop.enter.secondaryNav.offset)
    .add(prop.enter.toggleLabelClose.props, prop.enter.toggleLabelClose.offset)
    .add(prop.enter.toggleLabelOpen.props, prop.enter.toggleLabelOpen.offset)
}

/** ******************************************************************************************************
 *  WAVE ANIMATION
 *  ******************************************************************************************************/

/**
 * @typedef animationProps
 * @type {Object}
 * @property {Number} duration - the time the animation will run (the delay time will be added together the duration)
 * @property {String} direction - the direction of the animation [vertical: v; horizontal: h]
 * @property {String} orientation - the orientation of the animation [normal; inverse]
 * @property {String} transitionTimingFunction - the function that will smoother the animation [easeInOut]
 * @property {String} crestAmplitudeFunction - the function used to create the shapes of the crests [sin, random, linear]
 */

/**
 * @typedef waveProps
 * @type {Object}
 * @property {Number} crestNumber - the number of crests the wave has
 * @property {Number} crestDelay -the delay between each crest to make the shape of the wave
 * @property {animationProps} animation - the props for the animation
 *
 */

/**
 * The wave object contains the values for the wave curves.
 * It creates the shapes of the animation when executed.
 * @class Wave
 * @param {waveProps} waveProps { crestNumber, crestDelay, animation = {} }
 */
class Wave {
  constructor({ crestNumber, crestDelay, animation = {} }) {
    this.crestNumber = crestNumber
    this.animation = Object.assign(
      {
        duration: 1000,
        direction: DIRECTION_HORIZONTAL,
        orientation: '',
        transitionTimingFunction: EASE_IN_OUT,
        crestAmplitudeFunction: FUNCTION_NAME_RANDOM
      },
      animation
    )
    /**
     * The calcAmplitude returns a function used to calculate the amplitudes of the waves
     * Available functions: [
     * - sin
     * - random
     * - liner
     * ]
     * @param {String} fnName - the name of the function to calculate the amplitude
     * @param {Number} [a=1] - parameter for the function
     * @param {Number} [r=1] - parameter for the function
     * @return {Number} - the amplitude value for the curve
     */
    this.calcAmplitude = (fnName, a = 1, r = 1) => {
      return {
        sin: (a, r) => 0.25 * (Math.sin(a) + Math.sin(-a * r) + 2) * crestDelay,
        random: (a, r) => Math.random() * crestDelay + 1,
        linear: (a, r) => 1 * crestDelay,
        binary: (a, r) => (a % 2 === 0 ? 1 * crestDelay : 0 * crestDelay),
        square: (a, r) => a * crestDelay
      }[fnName](a, r)
    }
    /**
     * The calcCrestLength calculates the size of the wave. The wave size will be the total size of the SVG
     * divided by the number of waves.
     * @param {Number} i - the number of the curve
     * @return {Number} - It returns the size of the wave
     */
    this.calcCrestLength = (i) => (i + 1) / crestNumber
    this.amplitude = this.pushAmplitude(
      [],
      this.animation.crestAmplitudeFunction
    )
    this.status = STATUS_CLOSED
  }
  /**
   * The pushAmplitude function creates an array with the amplitudes used to create the shapes of the waves
   * @param {Array} array - an empty array to be filled in
   * @param {String} fnName - the name of the function to be used for the animation
   * @return {Array} - an array of amplitudes of each crest
   * @memberof Wave
   */
  pushAmplitude(array, fnName) {
    const crestNumber = this.crestNumber
    const calcAmplitude = this.calcAmplitude
    let switcher = 0
    return {
      sin: function (array) {
        const range = 4 * Math.random() + 6
        for (let i = 0; i <= crestNumber; i++) {
          const radian = (i / crestNumber) * Math.PI
          array.push(calcAmplitude(fnName, radian, range))
        }
        return array
      },
      random: function (array) {
        for (let i = 0; i <= crestNumber; i++) {
          array.push(calcAmplitude(fnName))
        }
        return array
      },
      linear: function (array) {
        for (let i = 0; i <= crestNumber; i++) {
          array.push(calcAmplitude(fnName))
        }
        return array
      },
      binary: function (array) {
        for (let i = 0; i <= crestNumber; i++) {
          array.push(calcAmplitude(fnName, i))
        }
        return array
      },
      square: function (array) {
        for (let i = 0; i <= crestNumber; i++) {
          let value = i
          let isModFive = value % 5 === 0 ? true : false
          if (isModFive) {
            switcher = switcher === 0 ? 1 : 0
          }
          array.push(calcAmplitude(fnName, switcher))
        }
        return array
      }
    }[fnName](array)
  }
  /**
   * The svgPath function creates the PATH used in the SVG HTMLelement
   * @return {String} - It returns an object with the possible SVG paths
   * @memberof Wave
   */
  svgPath() {
    return {
      M: (h, y) => `M ${h} ${y}`,
      H: (h) => `H ${h}`,
      V: (v) => `V ${v}`,
      C: ({ cpx, cpy, cpx1, cpy1, x, y }) =>
        `C ${cpx} ${cpy} ${cpx1} ${cpy1} ${x} ${y}`
    }
  }
  /**
   * The pushEasingCp function calculates the easing function for the control points for the SVG
   * and creates an array of it
   * @param {Number} screenWidthProportion - The screen size, default value 100
   * @param {Array} array - An empty array to be filled in with the control points for each curve
   * @param {Number} [speed=PIXELS_PER_FRAME] - The incremental value for the animation direction
   * @return {Array} - The control points for each curve
   * @memberof Wave
   */
  pushEasingCp(screenWidthProportion, array, speed) {
    const timingFn = this.animation.transitionTimingFunction
    this.y = speed
    this.amplitude.forEach((amp, i) => {
      const yControlPoint = Math.min(
        Math.max(this.y - amp, 0) / this.animation.duration,
        1
      )
      array.push(easingFn(timingFn, yControlPoint) * screenWidthProportion)
    })

    return array
  }
  /**
   * The pushLength function creates an array with the length of each wave
   * @param {Array} array - An empty array to be filled in with the lengths of the curves
   * @return {Array} - The lengths for each curve
   * @memberof Wave
   */
  pushLength(array) {
    for (let i = 0; i < this.crestNumber; i++) {
      array.push(this.calcCrestLength(i))
    }
    return array
  }
  /**
   * The horizontalWave function creates the SVG PATH for horizontal animation
   * @param {Array} controlPoints - an array of control point for each curve
   * @param {Array} length - an array of length of each curve
   * @param {Number} screenWidthProportion - the svg size
   * @return {String} - the svg PATH
   * @memberof Wave
   */
  horizontalWave(controlPoints, length, screenWidthProportion) {
    const svgPath = this.svgPath()
    let M, V, H
    let C = ''
    const orientation = this.animation.orientation
    if (orientation === ORIENTATION_INVERSE) {
      controlPoints[0] = invertOrientation(controlPoints[0])
      if (this.status === STATUS_CLOSED) {
        M = svgPath.M(controlPoints[0], 0)
        H = svgPath.H(100)
        V = svgPath.V(0)
      } else if (this.status === STATUS_OPENED) {
        M = svgPath.M(controlPoints[0], 0)
        V = svgPath.V(0)
        H = svgPath.H(0)
      } else {
        throw new Error('invalid param')
      }
      length.forEach((len, i) => {
        controlPoints[i + 1] = invertOrientation(controlPoints[i + 1])
        const cpY = (len - (1 / this.crestNumber) * 0.5) * screenWidthProportion
        C +=
          svgPath.C({
            cpx: controlPoints[i],
            cpy: cpY,
            cpx1: controlPoints[i + 1],
            cpy1: cpY,
            x: controlPoints[i + 1],
            y: len * screenWidthProportion
          }) + ' '
      })
    } else {
      if (this.status === STATUS_CLOSED) {
        M = svgPath.M(controlPoints[0], 0)
        V = svgPath.V(0)
        H = svgPath.H(0)
      } else if (this.status === STATUS_OPENED) {
        M = svgPath.M(controlPoints[0], 0)
        H = svgPath.H(100)
        V = svgPath.V(0)
      } else {
        throw new Error('invalid param')
      }
      length.forEach((len, i) => {
        const cpY = (len - (1 / this.crestNumber) * 0.5) * screenWidthProportion
        C +=
          svgPath.C({
            cpx: controlPoints[i],
            cpy: cpY,
            cpx1: controlPoints[i + 1],
            cpy1: cpY,
            x: controlPoints[i + 1],
            y: len * screenWidthProportion
          }) + ' '
      })
    }
    return `${M} ${C} ${H} ${V}`
  }
  /**
   * The verticalWave function creates the SVG PATH for vertical animation
   * @param {Array} controlPoints - an array of control point for each curve
   * @param {Array} length - an array of length of each curve
   * @param {Number} screenWidthProportion - the svg size
   * @return {String} - the svg PATH
   * @memberof Wave
   */
  verticalWave(controlPoints, length, screenWidthProportion) {
    const orientation = this.animation.orientation
    const svgPath = this.svgPath()
    let M, V, V1, H
    let C = ''
    if (orientation === ORIENTATION_INVERSE) {
      controlPoints[0] = invertOrientation(controlPoints[0])
      if (this.status === STATUS_CLOSED) {
        M = svgPath.M(0, controlPoints[0])
        V = ''
        V1 = svgPath.V(100)
      } else if (this.status === STATUS_OPENED) {
        M = svgPath.M(0, 0)
        V = svgPath.V(controlPoints[0])
        V1 = svgPath.V(0)
      } else {
        throw new Error(
          `invalid param ${orientation}. Choose [normal] or [inverse] `
        )
      }
      H = svgPath.H(0)
      length.forEach((len, i) => {
        controlPoints[i + 1] = invertOrientation(controlPoints[i + 1])
        const cpX = (len - (1 / this.crestNumber) * 0.5) * screenWidthProportion
        C +=
          svgPath.C({
            cpx: cpX,
            cpy: controlPoints[i],
            cpx1: cpX,
            cpy1: controlPoints[i + 1],
            x: len * screenWidthProportion,
            y: controlPoints[i + 1]
          }) + ' '
      })
    } else {
      if (this.status === STATUS_CLOSED) {
        M = svgPath.M(0, 0)
        V = svgPath.V(controlPoints[0])
        V1 = svgPath.V(0)
      } else if (this.status === STATUS_OPENED) {
        M = svgPath.M(0, controlPoints[0])
        V = ''
        V1 = svgPath.V(100)
      } else {
        throw new Error(
          `invalid param ${orientation}. Choose [normal] or [inverse] `
        )
      }
      H = svgPath.H(0)
      length.forEach((len, i) => {
        const cpX = (len - (1 / this.crestNumber) * 0.5) * screenWidthProportion
        C +=
          svgPath.C({
            cpx: cpX,
            cpy: controlPoints[i],
            cpx1: cpX,
            cpy1: controlPoints[i + 1],
            x: len * screenWidthProportion,
            y: controlPoints[i + 1]
          }) + ' '
      })
    }
    return `${M} ${V} ${C} ${V1} ${H}`
  }
  /**
   * The updatePath function updates the SVG PATH
   * @param {Number} speed - the incremental value that moves the animation
   * @param {Number} [screenWidthProportion=SVG_WIDTH] - the svg size
   * @return {String} the updated SVG PATH
   * @memberof Wave
   */
  updatePath(speed, screenWidthProportion = SVG_WIDTH) {
    const direction = this.animation.direction
    const length = this.pushLength([])
    const controlPoints = this.pushEasingCp(screenWidthProportion, [], speed)
    let d = ''
    if (direction === DIRECTION_VERTICAL) {
      d = this.verticalWave(controlPoints, length, screenWidthProportion)
    } else if (direction === DIRECTION_HORIZONTAL) {
      d = this.horizontalWave(controlPoints, length, screenWidthProportion)
    } else {
      throw new Error(`Invalid param ${direction}. Choose [v/h]`)
    }
    return d
  }
}
/**
 * The createWave function creates an instance of Wave
 * @param {waveProps} { crestNumber, crestDelay, duration, animation }
 * @return {Wave} - instance of Wave
 */
function createWave({ crestNumber, crestDelay, animation }) {
  return new Wave({ crestNumber, crestDelay, animation })
}

/**
 * @typedef wave
 * @type {Object}
 * @property {Number} duration - the time of the animation
 * @property {Number} crestDelay - the number of crests of the wave
 * @property {Number} waveDelay - the delay between each wave (if there is more than one)
 * @property {String} orientation - the orientation of the animation [v/h]
 * @property {String} direction - the direction of the animation [normal/inverse]
 * @property {String} transitionTimingFunction - the function used to smoother the animation
 * @property {String} crestAmplitudeFunction - the function used to create the shapes
 */

/**
 * @typedef propsOfTheAnimation
 * @type {Object}
 * @property {Number} duration
 * @property {wave} waves
 */
/**
 * The pushWaves function creates an array that that contains an instance of Wave an the PATH of the SVG (HTMLElement) to be animated
 * @param {Array} paths - the SVG PATH element from the DOM
 * @param {Array} array - an empty array to be filled in with an object that contains an instance of Wave and PATH element from the DOM
 * @param {propsOfTheAnimation} animationProps - the properties for the new instance of Wave
 * @return {Array} - It returns an array with a new instance of Wave, the path form the SVG tag and the waveDelay value
 */

function pushWaves(
  paths,
  array,
  {
    duration,
    waves: {
      crestNumber,
      crestDelay,
      waveDelay,
      orientation,
      direction,
      transitionTimingFunction,
      crestAmplitudeFunction
    }
  }
) {
  for (let i = 0; i < paths.length; i++) {
    const wave = createWave({
      crestNumber,
      crestDelay,
      animation: {
        duration,
        direction,
        orientation,
        transitionTimingFunction,
        crestAmplitudeFunction
      }
    })
    const path = paths[i]
    array.push({ wave, path, delay: waveDelay })
  }
  return array
}

/**
 * The animate function execute the animation
 * - It update the SVG PATH in each cycle
 * - It recalls itself while the elapsedTime is smaller than the duration plus the delay of the animation
 * @param {Array} waveArray - an Array that instance of Wave, the path form the SVG tag and the waveDelay value,
 * @param {Object} { duration, timeStart, waves: { crestDelay, waveDelay } }
 */
function animate(
  waveArray,
  { duration, timeStart, waves: { crestDelay, waveDelay } }
) {
  /** @type {DataTimeStamp} */
  const elapsedTime = Date.now() - timeStart
  /** @type {Number}*/
  const durationPlusDelay = duration + crestDelay + waveDelay * waveArray.length
  if (elapsedTime < durationPlusDelay) {
    window.requestAnimationFrame(() =>
      animate(waveArray, {
        duration,
        timeStart,
        waves: { crestDelay, waveDelay }
      })
    )
  }
  waveArray.forEach((w, i) => {
    if (w.wave.status === 'closed')
      w.path.setAttribute(
        'd',
        w.wave.updatePath(Date.now() - timeStart - waveDelay * i)
      )
    else
      w.path.setAttribute(
        'd',
        w.wave.updatePath(
          Date.now() - timeStart - waveDelay * (waveArray.length - i - 1)
        )
      )
  })
}

/** ******************************************************************************************************
 *  TOGGLE BUTTON STATE MACHINE
 *  ******************************************************************************************************/

/**
 * A function used to setup the animation when it starts
 * @param {DomElement} el
 */
function init(el) {
  header.classList.add(CLASS_IS_OPENED)
  el.classList.remove(CLASS_IS_CLOSED)
  el.classList.add(CLASS_IS_TRANSITIONING)
  el.classList.add(CLASS_VISIBLE)
}

/**
 * A function used to setup the animation when it ends
 * @param {DomElement} el
 */
function end(el) {
  header.classList.remove(CLASS_IS_OPENED)
  el.classList.remove(CLASS_IS_OPENED)
  el.classList.add(CLASS_IS_TRANSITIONING)
}

/**
 * A function used to setup the animation when it transition to Open state
 * @param {DomElement} el
 */
function toOpen(el) {
  el.classList.remove(CLASS_IS_TRANSITIONING)
  el.classList.add(CLASS_IS_OPENED)
}

/**
 * A function used to setup the animation when it transition to Close state
 * @param {DomElement} el
 */
function toClose(el) {
  el.classList.remove(CLASS_IS_TRANSITIONING)
  el.classList.add(CLASS_IS_CLOSED)
  el.classList.remove(CLASS_VISIBLE)
}

/**
 * @typedef stateMachineObject
 * @type {Object}
 * @property {Object} enter - AnimeJS object
 * @property {Object} exit - AnimeJS object
 * @property {number} duration - the duration of the animation
 */

// OVERLAY-TRANSITION STATE MACHINE
/**
 * A State-Machine that controls the state of the animation
 * Available States: [
 * - close
 * - transitioning
 * - open
 * ]
 * @param {stateMachineObject} { enter, exit, duration }
 * @return {Object} - It returns an Object with each state of the animation
 */
function createStateMachine({ enter, exit, duration }) {
  return {
    state: 'close',
    states: {
      open: {
        transition: function ({ el, waves }) {
          exit.play()
          if (el) end(el)
          if (waves)
            waves.forEach(({ wave }) => {
              wave.status = 'opened'
            })
          this.changeState('transition')
          this.setAction('toClose', [{ el }])
        }
      },
      transition: {
        toOpen: function ({ el }) {
          setTimeout(() => {
            if (el) toOpen(el)
            this.changeState('open')
          }, duration)
        },
        toClose: function ({ el }) {
          setTimeout(() => {
            if (el) toClose(el)
            this.changeState('close')
          }, duration)
        }
      },
      close: {
        transition: function ({ el, waves }) {
          enter.play()
          if (el) init(el)
          if (waves)
            waves.forEach(({ wave }) => {
              wave.status = 'closed'
            })
          this.changeState('transition')
          this.setAction('toOpen', [{ el }])
        }
      }
    },
    setAction(actionName, ...payload) {
      const actions = this.states[this.state]
      const action = actions[actionName]
      if (action) {
        action.apply(this, ...payload)
      } else {
        throw new Error('Not a valid action')
      }
    },
    changeState(newState) {
      if (newState) {
        this.state = newState
      }
    }
  }
}

/** ******************************************************************************************************
 *  IMPLEMENTATION
 *  ******************************************************************************************************/

/**
 * This function validates the user input. It throws an Error if there is one.
 * @param {Object} props
 */
function validateInput(props) {
  let {
    enter,
    exit,
    animationProps: {
      svg,
      duration,
      waves: {
        crestNumber,
        crestDelay,
        waveDelay,
        orientation,
        direction,
        transitionTimingFunction,
        crestAmplitudeFunction
      }
    }
  } = props

  try {
    if (!enter) {
      throw new Error('Missing param enter')
    }
    if (!exit) {
      throw new Error('Missing param exit')
    }
    if (!duration) {
      throw new Error('Missing param duration')
    }
    if (typeof crestNumber !== 'number') {
      throw new Error('Invalid param. crestNumber must be a [number]')
    }
    if (typeof crestDelay !== 'number') {
      throw new Error('Invalid param. crestDelay must be a [number]')
    }
    if (typeof waveDelay !== 'number') {
      throw new Error('Invalid param. waveDelay must be a [number]')
    }
    if (typeof orientation !== 'string') {
      throw new Error('Invalid param. orientation must be a [string]')
    }
    if (typeof direction !== 'string') {
      throw new Error('Invalid param. It must be a [string]')
    }
    if (typeof transitionTimingFunction !== 'string') {
      throw new Error('Invalid param. It must be a [string]')
    }
    if (typeof crestAmplitudeFunction !== 'string') {
      throw new Error('Invalid param. It must be a [string]')
    }
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * @typedef animationObject
 * @type {Object}
 * @param {Function} animateEnter
 * @param {Function} animateExit
 * @param {Object} animationProps
 */

/**
 * The OverlayAnimation class creates the animation and executes it.
 * It expects an object with the parameters for the animation, or execute it with default values.
 * The execute method starts the animation.
 * @class OverlayAnimation
 * @param {animationObject} {
 *     enter = animateEnter(),
 *     exit = animateExit(),
 *     animationProps = {
 *       duration: 1000,
 *       waves: {
 *         crestNumber: 1,
 *         crestDelay: 300,
 *         waveDelay: 200,
 *         orientation: 'inverse',
 *         direction: 'v',
 *         transitionTimingFunction: 'easeInOut',
 *         crestAmplitudeFunction: 'random'
 *       }
 *     }
 *   }
 */
class OverlayAnimation {
  constructor({
    enter = animateEnter(),
    exit = animateExit(),
    animationProps = {
      duration: 1000,
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
  }) {
    this.enter = enter
    this.exit = exit
    this.animationProps = animationProps
    this.createAnimation()
  }

  /**
   * updateAnimationsProps method updates the param of the animation
   * @param {Object} props - The wave params that need to be updated
   * @memberof OverlayAnimation
   */
  updateAnimationProps(props) {
    Object.assign(this.animationProps.waves, props)
    this.waveArray = pushWaves(paths, [], this.animationProps)
  }

  /**
   * execute method executes the animation
   * @memberof OverlayAnimation
   */
  execute() {
    let { animationProps, waveArray } = this
    if (this.stateMachine.state === 'transition') {
      return
    }
    Object.assign(animationProps, { timeStart: Date.now() })
    animate(waveArray, animationProps)
    this.stateMachine.setAction('transition', [
      { el: overlayTransition, waves: waveArray }
    ])
  }

  /**
   * createAnimation method is used before the execute method to set up the animation
   * @memberof OverlayAnimation
   */
  createAnimation() {
    let { enter, exit, animationProps } = this
    validateInput({
      enter,
      exit,
      animationProps
    })

    let {
      duration,
      waves: { crestDelay, waveDelay }
    } = this.animationProps
    this.waveArray = pushWaves(paths, [], animationProps)

    const transitionDuration =
      duration + crestDelay + waveDelay * this.waveArray.length

    this.stateMachine = createStateMachine({
      enter,
      exit,
      duration: transitionDuration
    })
  }
}

// It binds the overlayAnimation function to the window Object
if (window && !window.overlayAnimation) {
  window['Navkit'] = {
    OverlayAnimation,
    animation: {
      animateExit: animateExit,
      animateEnter: animateEnter
    }
  }
}
