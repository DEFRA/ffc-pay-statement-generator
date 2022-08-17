const summary = (statement) => {
  return [
    { text: `${statement.scheme.name} ${statement.scheme.year}`, style: 'header1' },
    { text: 'Payment statement', style: 'subTitle' }
  ]
}

module.exports = summary
