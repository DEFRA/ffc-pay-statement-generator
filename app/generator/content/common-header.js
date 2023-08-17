const path = require('path')
const { millimetresToPoints } = require('../conversion')
const getAddress = require('./get-address')
const getBusinessName = require('./get-business-name')
const getSBI = require('./get-sbi')
const getAgreementNumber = require('./get-agreement-number')
const imagePath = path.join(__dirname, '../', 'images')

const commonHeader = (statement) => {
	return {
		stack: [
			{ image: `${imagePath}/v2/logo.jpg`, fit: [millimetresToPoints(200), millimetresToPoints(25)], style: 'logo' },
			getAddress(statement.businessName, statement.address),
			getSBI(statement.sbi),
			getBusinessName(statement.businessName),
			getAgreementReference(schedule.scheme.agreementNumber),
		],
		unbreakable: true
	}
}

module.exports = commonHeader