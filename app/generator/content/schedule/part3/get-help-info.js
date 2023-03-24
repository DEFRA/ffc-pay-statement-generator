const getHelpInfo = () => {
  return {
    stack: [
      { text: 'Get help with your payment', style: 'header2' },
      'If you think your payments are wrong, you can:\n\n',
      {
        ul: ['[log into the Rural Payments service](www.gov.uk/claim-rural-payments) to check your SFI standard agreement',
          'check statements and letters you\'ve received from us',
          'review the SFI scheme information at www.gov.uk/government/collections/sustainable-farming-incentive-guidance'
        ],
        listStyle: 'square'
      },
      '\n\nIf you still have questions about your payments, you can use the query form to contact us.'
    ]
  }
}

module.exports = getHelpInfo
