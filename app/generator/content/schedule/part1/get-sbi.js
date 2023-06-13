const getSBI = (sbi) => {
  return {
    columns: [
      { width: 200, text: 'SBI:' },
      { width: '*', text: sbi }
    ],
    style: 'column',
    columnGap: 10
  }
}

module.exports = getSBI
