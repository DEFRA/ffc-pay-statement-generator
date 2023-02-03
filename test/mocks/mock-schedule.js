module.exports = {
  businessName: 'Mr A Farmer',
  sbi: 123456789,
  frn: 1234567890,
  email: 'farmer@farms.com',
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
    frequency: 'Quarterly',
    agreementNumber: 'SFI1234567'
  },
  adjustment: {
    currentValue: '1000.00',
    newValue: '1500.00',
    adjustmentValue: '500.00'
  },
  schedule: [{
    order: 1,
    dueDate: '01/12/2022',
    period: 'September to November 2022',
    value: '250.00'
  },
  {
    order: 2,
    dueDate: undefined,
    period: 'Adjustment',
    value: '125.00'
  },
  {
    order: 3,
    dueDate: '01/03/2023',
    period: 'December to February 2023',
    value: '250.00'
  },
  {
    order: 4,
    dueDate: '01/06/2023',
    period: 'March to May 2023',
    value: '250.00'
  },
  {
    order: 5,
    dueDate: '01/09/2023',
    period: 'June to August 2023',
    value: '250.00'
  }]
}
