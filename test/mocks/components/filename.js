const moment = require('moment')

const SYSTEM_TIME = require('./system-time')

const MOCK_SCHEDULE = require('../mock-schedule')
const MOCK_STATEMENT = require('../mock-statement')

module.exports = {
  SCHEDULE: `FFC_PaymentSchedule_${MOCK_SCHEDULE.scheme.shortName}_${MOCK_SCHEDULE.scheme.year}_${MOCK_SCHEDULE.frn}_${moment(SYSTEM_TIME).format('YYYYMMDDHHmmssSS')}.pdf`.replace(/\s/g, ''),
  STATEMENT: `FFC_PaymentStatement_${MOCK_STATEMENT.scheme.shortName}_${MOCK_STATEMENT.scheme.year}_${MOCK_STATEMENT.frn}_${moment(SYSTEM_TIME).format('YYYYMMDDHHmmssSS')}.pdf`.replace(/\s/g, '')
}
