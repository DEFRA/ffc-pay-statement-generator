const path = require('path')
const { millimetresToPoints } = require('../conversion')
const imagePath = path.join(__dirname, '..', 'images')

const summary = (statement) => {
  return {
    stack: [
      { image: `${imagePath}/rpa-logo.jfif`, fit: [millimetresToPoints(200), millimetresToPoints(25)], style: 'logo' },
      getAddress(statement.businessName, statement.address),
      { text: `${statement.scheme.name} ${statement.scheme.year}`, style: 'header1' },
      { text: 'Payment statement', style: 'subTitle' },
      getBusinessNameColumns(statement.businessName),
      getSBIColumns(statement.sbi),
      ...getSummaryText(statement.scheme)
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

const getBusinessNameColumns = (businessName) => {
  return {
    columns: [
      { width: 200, text: 'Business name:' },
      { width: '*', text: businessName }
    ],
    style: 'column',
    columnGap: 10
  }
}

const getSBIColumns = (sbi) => {
  return {
    columns: [
      { width: 200, text: 'Single business identifier (SBI):' },
      { width: '*', text: sbi }
    ],
    style: 'column',
    columnGap: 10
  }
}

const getSummaryText = (scheme) => {
  return [
    `\n\nThis statement explains your payment for the ${scheme.name} (${scheme.shortName}). It is made up of 3 parts.`,
    '\nPart 1 provides a summary of the most recent payment.',
    'Part 2 explains how we calculated the payment.',
    'Part 3 highlights were to go for more information.'
  ]
}

module.exports = summary
