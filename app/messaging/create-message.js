const createMessage = (statement, filename) => {
  return {
    body: {
      businessName: statement.businessName,
      sbi: statement.sbi,
      frn: statement.frn,
      address: statement.address,
      email: statement.email,
      filename
    },
    type: 'uk.gov.pay.statement.publish',
    source: 'ffc-pay-statement-generator'
  }
}

module.exports = createMessage
