const path = require('path')
const fontPath = path.resolve(__dirname)

module.exports = {
  Arial: {
    normal: `${fontPath}/Arial.ttf`,
    bold: `${fontPath}/Arial_Bold.ttf`,
    italics: `${fontPath}/Arial_Italic.ttf`,
    bolditalics: `${fontPath}/Arial_Bold_Italic.ttf`
  }
}
