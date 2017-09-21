import './polyfills'

import React, { Component } from 'react'
import { render } from 'react-dom'
import Plank from 'gm/components/Planc'
import Ball from 'gm/components/Ball'

import './index.styl'

class Index extends Component {
  render() {
    return (
      <div className="container">
        <Plank top={0} />
        {Array(1)
          .join('1')
          .split('1')
          .map((item, i) => (
            <Ball
              key={i}
              topPlank={{
                bottomLeftX: 800 / 2 - 300 / 2,
                bottomLeftY: 1000 - 40,
                topRightX: 800 / 2 - 300 / 2 + 300,
                topRightY: 1000
              }}
              bottomPlank={{
                bottomLeftX: 800 / 2 - 300 / 2,
                bottomLeftY: 0,
                topRightX: 800 / 2 - 300 / 2 + 300,
                topRightY: 40
              }}
            />
          ))}
        <Plank top={960} />
      </div>
    )
  }
}

render(<Index />, document.getElementById('app'))
