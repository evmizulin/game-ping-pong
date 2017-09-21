import React, { Component } from 'react'
import utils from 'gm/helpers/Utils.js'
import PropTypes from 'prop-types'

import './ball.styl'

export default class Ball extends Component {
  static propTypes = {
    topPlank: PropTypes.shape({
      bottomLeftX: PropTypes.number.isRequired,
      bottomLeftY: PropTypes.number.isRequired,
      topRightX: PropTypes.number.isRequired,
      topRightY: PropTypes.number.isRequired
    }).isRequired,
    bottomPlank: PropTypes.shape({
      bottomLeftX: PropTypes.number.isRequired,
      bottomLeftY: PropTypes.number.isRequired,
      topRightX: PropTypes.number.isRequired,
      topRightY: PropTypes.number.isRequired
    }).isRequired
  }
  constructor(props) {
    super(props)

    this.MIN = { x: 0, y: 0 }
    this.MAX = { x: 800, y: 1000 }
    this.INIT = {
      x: (this.MAX.x - this.MIN.x) / 2,
      y: (this.MAX.y - this.MIN.y) / 2
    }
    this.interval = null
    this.state = { x: this.INIT.x, y: this.INIT.y }
  }

  set({ x, y }, lineFunc) {
    const isDotOutByY = y < this.MIN.y || y > this.MAX.y
    const isDotOutByX = x > this.MAX.x || x < this.MIN.x
    const isDotInTopPlanc = utils.isDotInSquare({ x, y }, this.props.topPlank)
    const isDotInBottomPlanc = utils.isDotInSquare(
      { x, y },
      this.props.bottomPlank
    )
    const isDotMoving =
      !isDotOutByY && !isDotOutByX && !isDotInTopPlanc && !isDotInBottomPlanc

    console.log(
      `isDotOutByY: ${isDotOutByY}; ` +
        `isDotOutByX: ${isDotOutByX}; ` +
        `isDotInTopPlanc: ${isDotInTopPlanc}; ` +
        `isDotInBottomPlanc: ${isDotInBottomPlanc}; ` +
        `isDotMoving: ${isDotMoving}`
    )

    if (isDotOutByY) {
      this.stop()
      return
    }

    if (isDotMoving) {
      this.setState({ x, y })
      return
    }

    if (isDotOutByX) {
      this.stop()
      const xRandom = utils.getRandomDot(this.MIN, this.MAX, this.state).x
      const xAxis = x < this.MIN.x ? this.MIN.x : this.MAX.x
      const xCrossDot = {
        x: xAxis,
        y: lineFunc.a * xAxis + lineFunc.b
      }
      this.move(this.state, {
        x: xRandom,
        y: -(lineFunc.a * xRandom) + (xCrossDot.y + lineFunc.a * xCrossDot.x)
      })
      return
    }

    if (isDotInBottomPlanc || isDotInTopPlanc) {
      this.stop()
      const yAxis = isDotInBottomPlanc
        ? this.props.bottomPlank.topRightY
        : this.props.topPlank.bottomLeftY
      const yRandom = utils.getRandomDot(
        isDotInBottomPlanc ? { x: this.MIN.x, y: yAxis } : this.MIN,
        isDotInBottomPlanc ? this.MAX : { x: this.MAX.x, y: yAxis },
        this.state
      ).y
      const yCrossDot = {
        x: (yAxis - lineFunc.b) / lineFunc.a,
        y: yAxis
      }
      this.move(this.state, {
        x: (yRandom - (yCrossDot.y + lineFunc.a * yCrossDot.x)) / -lineFunc.a,
        y: yRandom
      })
      return
    }
  }

  stop() {
    clearInterval(this.interval)
  }

  move(from, to) {
    const lineFunc = utils.getLineFunc(from, to)
    const speed = 1
    const module = to.x - from.x > 0 ? 1 : -1
    const xIncrement =
      module * Math.sqrt(Math.pow(speed, 2) / (1 + Math.pow(lineFunc.a, 2)))
    let xIterator = xIncrement
    this.interval = setInterval(() => {
      const xNext = from.x + xIterator
      this.set(
        {
          x: xNext,
          y: lineFunc(xNext)
        },
        lineFunc
      )
      xIterator += xIncrement
    }, 5)
  }

  componentDidMount() {
    this.move(this.INIT, utils.getRandomDot(this.MIN, this.MAX, this.INIT))
  }

  render() {
    return (
      <div
        className="ball"
        style={{ bottom: this.state.y, left: this.state.x }}
      />
    )
  }
}
