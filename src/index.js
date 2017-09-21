import './polyfills'

import React, { Component } from 'react'
import { render } from 'react-dom'
import Plank from 'gm/components/Planc'
import Ball from 'gm/components/Ball'

import './index.styl'

class Index extends Component {
  constructor() {
    super()
    this.state = {
      topPlank: {
        bottomLeftX: 800 / 2 - 300 / 2,
        bottomLeftY: 1000 - 40,
        topRightX: 800 / 2 - 300 / 2 + 300,
        topRightY: 1000
      },
      bottomPlank: {
        bottomLeftX: 800 / 2 - 300 / 2,
        bottomLeftY: 0,
        topRightX: 800 / 2 - 300 / 2 + 300,
        topRightY: 40
      }
    }
  }

  onChange(isTop, isBottom, props) {
    const plank = isTop ? 'topPlank' : 'bottomPlank'
    const state = {}
    state[plank] = props
    this.setState(state)
  }

  render() {
    return (
      <div className="container">
        <Plank
          bottom={960}
          onPositionChange={(...props) => this.onChange(true, false, ...props)}
        />
        {Array(1)
          .join('1')
          .split('1')
          .map((item, i) => (
            <Ball
              key={i}
              topPlank={this.state.topPlank}
              bottomPlank={this.state.bottomPlank}
            />
          ))}
        <Plank
          bottom={0}
          onPositionChange={(...props) => this.onChange(false, true, ...props)}
        />
      </div>
    )
  }
}

render(<Index />, document.getElementById('app'))
