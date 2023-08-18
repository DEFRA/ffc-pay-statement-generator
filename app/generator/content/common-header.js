const path = require('path')
const { millimetresToPoints } = require('../conversion')
const getAddress = require('./get-address')
const getBusinessName = require('./get-business-name')
const getSBI = require('./get-sbi')
const getAgreementNumber = require('./get-agreement-number')

// I know this isn't right, but trying to understand why this works but without it doesn't
const businessName = require('../../messaging/schemas/business-name')
const address = require('../../messaging/schemas/address')
const scheme = require('../../messaging/schemas/scheme')
const sbi = require('../../messaging/schemas/sbi')

const imagePath = path.join(__dirname, '../', 'images')

const commonHeader = () => {
	return {
		stack: [
			{ image: `${imagePath}/v2/logo.jpg`, fit: [millimetresToPoints(200), millimetresToPoints(25)], style: 'logo' },
			getAddress(businessName, address),
			getSBI(sbi),
			getBusinessName(businessName),
			getAgreementNumber(scheme.agreementNumber),
		],
		unbreakable: true
	}
}

module.exports = commonHeader