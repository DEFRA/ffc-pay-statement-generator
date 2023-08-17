const getHelpInfo = () => {
  return {
    stack: [
      { text: 'More information', style: 'h3' },
      'If you think your payments are wrong, you should:\n',
      {
        ul: [{
          text: [
            'log into the Rural Payments service ',
            { text: 'www.gov.uk/claim-rural-payments', link: 'https://www.gov.uk/claim-rural-payments', decoration: 'underline' },
            ' to check your SFI standard agreement'
          ]
        },
          'check statements and letters you\'ve received from us',
        {
          text: [
            'review the SFI scheme information at ',
            { text: 'www.gov.uk/government/collections/sustainable-farming-incentive-guidance', link: 'https://www.gov.uk/government/collections/sustainable-farming-incentive-guidance', decoration: 'underline' }
          ]
        }],
        listStyle: 'square'
      },
      { text: 'If you have any questions about this email', style: 'h3' },
      {
        text: [
          'You can email ',
          { text: 'ruralpayments@defra.gov.uk', link: 'mailto:ruralpayments@defra.gov.uk', decoration: 'underline' },
          ' or call us on 03000 200 301 (Monday to Friday, 8.30am to 5pm). Please tell us your SBI and Agreement number if applicable which are at the top of this email.'
        ]
      },
      { text: 'SFI', style: 'header3' },
      {
        text: [
          'Rural Payments Agency | PO Box 325 | WORKSOP | S95 1DG',
          { text: '\nruralpayments@defra.gov.uk', link: 'mailto:ruralpayments@defra.gov.uk', decoration: 'underline' },
          ' | 03000 200 301 | ',
          { text: 'gov.uk/defra/sfi', link: 'https://www.gov.uk/government/collections/sustainable-farming-incentive-guidance', decoration: 'underline' },
          '\nFollow us on Twitter @Ruralpay'
        ]
      }
    ],
    unbreakable: true
  }
}

module.exports = getHelpInfo
