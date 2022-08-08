const path = require('path')
const imagePath = path.join(__dirname, '..', 'images')

const summary = (statement) => {
  return {
    stack: [
      { image: `${imagePath}/rpa-logo.jfif`, width: 150 },
      { text: `${statement.scheme.name} ${statement.scheme.year}`, style: 'header1' },
      { text: 'Payment statement', style: 'subTitle' }
    ],
    unbreakable: true
  }
}

module.exports = summary
