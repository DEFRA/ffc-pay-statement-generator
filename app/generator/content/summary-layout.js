const path = require('path')
const { millimetresToPoints } = require('../conversion')
const getAddress = require('./get-address')
const getSBI = require('./get-sbi')
const getBusinessName = require('./get-business-name')
const getAgreementNumber = require('./get-agreement-number')
const imagePath = path.join(__dirname, '..', 'images')

const getSummary = (summary) => {
	return {
		stack: [
			{
				image: `${imagePath}/v2/logo.jpg`,
				fit: [millimetresToPoints(200), millimetresToPoints(25)],
				style: 'logo'
			},
			getAddress(summary.businessName, summary.address),
			{
				text: `${summary.scheme.name} ${summary.scheme.year}`,
				style: 'header14'
			},
			{ text: 'Payment summary', style: 'header14' },
			getSBI(summary.sbi),
			getBusinessName(summary.businessName),
			getAgreementNumber(summary.scheme.agreementNumber)
		],
		unbreakable: true
	}
}

module.exports = getSummary
