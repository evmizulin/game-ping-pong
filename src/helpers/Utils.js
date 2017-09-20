import random from 'lodash.random'

class Utils {
  getRandomDot(min, max, exception) {
    let x
    let y
    while (true) {
      x = random(min.x, max.x)
      y = random(min.y, max.y)
      if (x !== exception.x && y !== exception.y) break
    }
    return { x, y }
  }

  getLineFunc(c1, c2) {
    const a = (c2.y - c1.y) / (c2.x - c1.x)
    const b = c1.y - a * c1.x
    const func = x => a * x + b
    func.a = a
    func.b = b

    return func
  }
}

export default new Utils()
