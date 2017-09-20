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
        {Array(2)
          .join('1')
          .split('1')
          .map((item, i) => <Ball key={i} plancs={[{ x: 3, y: 8 }]} />)}
        <Plank top={960} />
      </div>
    )
  }
}

render(<Index />, document.getElementById('app'))
