import React, { Component } from 'react'
import utils from 'gm/helpers/Utils.js'
import PropTypes from 'prop-types'

import './ball.styl'

export default class Ball extends Component {
  static propTypes = {
    plancs: PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
      })
    ).isRequired
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
    this.plancs = props.plancs
    this.state = { x: this.INIT.x, y: this.INIT.y }
  }

  componentWillReceiveProps(props) {
    this.plancs = props.plancs
  }

  set({ x, y }, lineFunc) {
    if (
      x >= this.MIN.x &&
      x <= this.MAX.x &&
      y >= this.MIN.y &&
      y <= this.MAX.y
    ) {
      this.setState({ x, y })
      return
    }

    this.stop()
    const { x: xRandom, y: yRandom } = utils.getRandomDot(
      this.MIN,
      this.MAX,
      this.state
    )

    if (x < this.MIN.x || x > this.MAX.x) {
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

    if (y < this.MIN.y || y > this.MAX.y) {
      const yAxis = y < this.MIN.y ? this.MIN.y : this.MAX.y
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

    this.move(this.state, utils.getRandomDot(this.MIN, this.MAX, this.state))
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
