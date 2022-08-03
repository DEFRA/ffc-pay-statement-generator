module.exports = {
  businessName: 'Mr A Farmer',
  sbi: 1234567489,
  address: {
    line1: 'A Farm',
    line2: '',
    line3: 'Near a field',
    line4: 'Newcastle Upon Tyne',
    line5: 'Tyne & Wear',
    postcode: 'NE1 1AA'
  },
  scheme: {
    name: 'Sustainable Farming Incentive',
    shortName: 'SFI',
    year: '2022',
    frequency: 'Quarterly'
  },
  payments: [{
    invoiceNumber: 'S0000001C000001V001',
    dueDate: '1 July 2022',
    settled: '1 July 2022',
    calculated: '16 June 2022',
    value: '317.15'
  }],
  funding: [{
    name: 'Arable and horticultural soils',
    level: 'Introductory',
    area: '5.00',
    rate: '2.52',
    annualValue: '110.00',
    quarterlyValue: '27.50',
    quarterlyReduction: '0.00',
    quarterlyPayment: '27.50',
    reductions: []
  }, {
    name: 'Arable and horticultural soils',
    level: 'Intermediate',
    area: '10.00',
    rate: '2.52',
    annualValue: '400.00',
    quarterlyValue: '100.00',
    quarterlyReduction: '0.00',
    quarterlyPayment: '100.00',
    reductions: []
  }, {
    name: 'Improved grassland soils',
    level: 'Introductory',
    area: '15.00',
    rate: '2.52',
    annualValue: '420.00',
    quarterlyValue: '105.00',
    quarterlyReduction: '50.00',
    quarterlyPayment: '92.50',
    reductions: [{
      reason: 'Land area has changed',
      value: '50.00'
    }]
  }, {
    name: 'Moorland',
    level: 'Introductory',
    area: '12.00',
    rate: '2.52',
    annualValue: '388.60',
    quarterlyValue: '97.15',
    quarterlyReduction: '0.00',
    quarterlyPayment: '97.15',
    reductions: []
  }, {
    name: 'Overall',
    level: '',
    area: '42.00',
    rate: '2.52',
    annualValue: '1318.60',
    quarterlyValue: '329.65',
    quarterlyReduction: '50.00',
    quarterlyPayment: '317.15'
  }]
}
