const part3 = (_statement) => {
  return [
    { text: 'Part 3. More support', style: 'header2' },
    'If you think your payment is wrong you should:\n\n',
    {
      ul: [
        {
          text: [
            'check your land parcel information in the Rural Payments service at ',
            { text: 'www.gov.uk/claim-rural-payments', link: 'https://www.gov.uk/claim-rural-payments', style: 'link' }
          ]
        }, {
          text: [
            'review the SFI scheme information at ',
            { text: 'www.gov.uk/sfi', link: 'https://www.gov.uk/sfi', style: 'link' }
          ]
        }
      ]
    },
    {
      text: [
        'If you still do not agree with the amount you have been paid, contact us within 3 months of the payment date at ',
        { text: 'ruralpayments@defra.gov.uk', link: 'ruralpayments@defra.gov.uk', style: 'link' },
        '.\n\n'
      ]
    },
    {
      text: [
        'Find other ways to get in touch at ',
        { text: 'www.gov.uk/guidance/contacting-the-rpa-about-sfi', link: 'https://www.gov.uk/guidance/contacting-the-rpa-about-sfi', style: 'link' },
        '.'
      ]
    },
    { text: 'To receive this statement in large print or alternative format, contact the Rural Payments Agency', style: 'header2' }
  ]
}

module.exports = part3
