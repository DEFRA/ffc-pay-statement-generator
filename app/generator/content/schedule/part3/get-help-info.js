const getHelpInfo = () => {
  return {
    stack: [
      { text: 'Get help with your payment', style: 'header2' },
      'If you think your payments are wrong, you can:\n\n',
      {
        ul: [{
          text: [
            { text: 'log into the Rural Payments service', link: 'www.gov.uk/claim-rural-payments', decoration: 'underline' },
            ' to check your SFI standard agreement'
          ]
        },
        'check statements and letters you\'ve received from us',
        {
          text: [
            'review the SFI scheme information at ',
            { text: 'www.gov.uk/government/collections/sustainable-farming-incentive-guidance', link: 'www.gov.uk/government/collections/sustainable-farming-incentive-guidance', decoration: 'underline' }
          ]
        }],
        listStyle: 'square'
      },
      {
        text: [
          '\n\nIf you still have questions about your payments, you can ',
          { text: 'use the query form', link: 'https://www.gov.uk/government/publications/contact-the-rpa-about-sfi', decoration: 'underline' },
          ' to contact us.'
        ]
      }
    ]
  }
}

module.exports = getHelpInfo
