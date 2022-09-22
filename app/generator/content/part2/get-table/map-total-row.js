const mapTotalRow = (row) => {
  if (!row) {
    return ['', '', '', '', '', '', '', '']
  }
  return [
    { text: row.name, bold: true },
    { text: row.level, bold: true },
    { text: row.rate, style: 'tableNumber', bold: true },
    { text: row.area, style: 'tableNumber', bold: true },
    { text: `£${row.annualValue}`, style: 'tableNumber', bold: true },
    { text: `£${row.quarterlyValue}`, style: 'tableNumber', bold: true },
    { text: `£${row.quarterlyReduction}`, style: 'tableNumber', bold: true },
    { text: `£${row.quarterlyPayment}`, style: 'tableNumber', bold: true }
  ]
}

module.exports = mapTotalRow
