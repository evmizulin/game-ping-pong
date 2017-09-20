import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './planc.styl'

export default class Plank extends Component {
  static propTypes = {
    top: PropTypes.number.isRequired
  }

  constructor() {
    super()

    this.MAX = 800 - 300
    this.MIN = 0
    this.STEP = 15
    this.state = { position: 800 / 2 - 300 / 2 }

    this.toRightInterval = null
    this.toLeftInterval = null

    this.onKeyDown = event => {
      if (event.key === 'ArrowRight' && !this.toRightInterval) {
        this.toRightInterval = setInterval(() => {
          const nextTik = this.state.position + this.STEP
          this.setState({ position: nextTik >= this.MAX ? this.MAX : nextTik })
        }, 10)
      }
      if (event.key === 'ArrowLeft' && !this.toLeftInterval) {
        this.toLeftInterval = setInterval(() => {
          const nextTik = this.state.position - this.STEP
          this.setState({ position: nextTik <= this.MIN ? this.MIN : nextTik })
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

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown)
    document.addEventListener('keyup', this.onKeyUp)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown)
    document.removeEventListener('keyup', this.onKeyUp)
  }

  render() {
    const { top } = this.props
    return <div className="plank" style={{ left: this.state.position, top }} />
  }
}
