const getAgreementReference = (agreementReference) => {
  return {
    columns: [
      { width: 200, text: 'Agreement number:' },
      { width: '*', text: agreementReference }
    ],
    style: 'column',
    columnGap: 10
  }
}

module.exports = getAgreementReference
