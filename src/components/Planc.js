import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './planc.styl'

export default class Plank extends Component {
  static propTypes = {
    bottom: PropTypes.number.isRequired,
    onPositionChange: PropTypes.func.isRequired
  }

  constructor() {
    super()

    this.FIELD_WIDTH = 800
    this.PLANC_HEIGHT = 40
    this.PLANC_WIDTH = 300
    this.MAX = this.FIELD_WIDTH - this.PLANC_WIDTH
    this.MIN = 0
    this.STEP = 15
    this.state = { xPosition: this.FIELD_WIDTH / 2 - this.PLANC_WIDTH / 2 }

    this.toRightInterval = null
    this.toLeftInterval = null

    this.onKeyDown = event => {
      if (event.key === 'ArrowRight' && !this.toRightInterval) {
        this.toRightInterval = setInterval(() => {
          const nextTik = this.state.xPosition + this.STEP
          this.set(nextTik >= this.MAX ? this.MAX : nextTik)
        }, 10)
      }
      if (event.key === 'ArrowLeft' && !this.toLeftInterval) {
        this.toLeftInterval = setInterval(() => {
          const nextTik = this.state.xPosition - this.STEP
          this.set(nextTik <= this.MIN ? this.MIN : nextTik)
        }, 10)
      }
    }

    this.onKeyUp = event => {
      if (event.key === 'ArrowRight' && this.toRightInterval) {
        clearInterval(this.toRightInterval)
        this.toRightInterval = null
      }
      if (event.key === 'ArrowLeft' && this.toLeftInterval) {
        clearInterval(this.toLeftInterval)
        this.toLeftInterval = null
      }
    }
  }

  set(xPosition) {
    const { bottom } = this.props
    const { onPositionChange } = this.props
    onPositionChange({
      bottomLeftX: xPosition,
      bottomLeftY: bottom,
      topRightX: xPosition + this.PLANC_WIDTH,
      topRightY: bottom + this.PLANC_HEIGHT
    })
    this.setState({ xPosition })
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown)
    document.addEventListener('keyup', this.onKeyUp)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown)
    document.removeEventListener('keyup', this.onKeyUp)
  }

  render() {
    const { bottom } = this.props
    return (
      <div
        className="plank"
        style={{
          left: this.state.xPosition,
          bottom,
          height: this.PLANC_HEIGHT,
          width: this.PLANC_WIDTH
        }}
      />
    )
  }
}
