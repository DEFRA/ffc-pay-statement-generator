const summary = (statement) => {
  return [
    getTitle(statement.scheme),
    subTitle
  ]
}

const getTitle = (scheme) => {
  return {
    text: `${scheme.name} ${scheme.year}`,
    style: 'header1'
  }
}

const subTitle = {
  text: 'Payment statement',
  style: 'subTitle'
}

module.exports = summary
