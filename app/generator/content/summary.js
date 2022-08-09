const path = require('path')
const { millimetresToPoints } = require('../conversion')
const imagePath = path.join(__dirname, '..', 'images')

const summary = (statement) => {
  return {
    stack: [
      { image: `${imagePath}/rpa-logo.jfif`, fit: [millimetresToPoints(200), millimetresToPoints(25)] },
      getAddress(statement.businessName, statement.address),
      { text: `${statement.scheme.name} ${statement.scheme.year}`, style: 'header1' },
      { text: 'Payment statement', style: 'subTitle' }
    ],
    unbreakable: true
  }
}

const getAddress = (businessName, address) => {
  let fullAddress = `${businessName}\n`
  const addressLines = Object.values(address)
  addressLines.filter(x => x !== undefined && x !== null && x !== '').forEach(x => {
    fullAddress += `${x}\n`
  })
  return { text: fullAddress, style: 'address', absolutePosition: { x: millimetresToPoints(10), y: millimetresToPoints(35) } }
}

module.exports = summary
