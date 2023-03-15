const moment = require('moment')

const SYSTEM_TIME = require('./system-time')

const MOCK_SCHEDULE = require('../mock-schedule')

module.exports = `FFC_PaymentSchedule_${MOCK_SCHEDULE.scheme.shortName}_${MOCK_SCHEDULE.scheme.year}_${MOCK_SCHEDULE.frn}_${moment(SYSTEM_TIME).format('YYYYMMDDHHmmssSS')}.pdf`.replace(/\s/g, '')
