const greetName = (businessName) => {
  return {
    columns: [
      { width: 27, text: 'Dear' },
      { width: '*', text: businessName }
    ],
    style: 'column',
    columnGap: 2
  }
}

module.exports = greetName
