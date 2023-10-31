const greetName = (businessName) => {
  return {
    columns: [
      { width: 30, text: ' Dear' },
      { width: '*', text: businessName }
    ],
    style: 'column',
    columnGap: 10
  }
}

module.exports = greetName
