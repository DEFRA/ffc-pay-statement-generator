const { millimetresToPoints } = require('./conversion')

module.exports = {
  default: {
    font: 'Arial',
    fontSize: 12,
    lineHeight: 1.15
  },
  h1: {
    fontSize: 16,
    bold: true,
    margin: [0, 10, 0, 10]
  },
  h2: {
    fontSize: 14,
    bold: true,
    margin: [0, 40, 0, 10]
  },
  h3: {
    fontSize: 12,
    bold: true,
    margin: [0, 10, 0, 10]
  },
  subTitle: {
    fontSize: 18,
    margin: [0, 0, 0, 30]
  },
  link: {
    decoration: 'underline',
    color: 'blue'
  },
  table: {
    fontSize: 10,
    margin: [0, 10, 0, 10],
    backgroundColor: 'white'
  },
  tableHeader: {
    fontSize: 12,
    bold: true,
    margin: [0, 0, 0, 5]
  },
  tableNumber: {
    alignment: 'right'
  },
  logo: {
    margin: [0, 20, 0, millimetresToPoints(50)]
  },
  address: {
    fontSize: 9.5,
    lineHeight: 1,
    margin: [0, 10, 0, millimetresToPoints(50)]
  },
  scheduleLogo: {
    margin: [0, 20, 0, millimetresToPoints(50)]
  },
  scheduleAddress: {
    margin: [0, 10, 0, 10]
  },
  style: {
    margin: [0, 0, 0, 5]
  }
}
