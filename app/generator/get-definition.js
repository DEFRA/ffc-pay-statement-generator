const styles = require('./styles')
const generateContent = require('./content')
const { A4 } = require('./page-sizes')

const getDefinition = (statement) => {
  return {
    pageSize: A4,
    content: generateContent(statement),
    styles,
    defaultStyle: styles.default
  }
}

module.exports = getDefinition
