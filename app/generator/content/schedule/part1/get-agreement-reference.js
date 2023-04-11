const getAgreementReference = (agreementReference) => {
  return {
    columns: [
      { width: 200, text: 'Agreement reference number:' },
      { width: '*', text: agreementReference }
    ],
    style: 'column',
    columnGap: 10
  }
}

module.exports = getAgreementReference
