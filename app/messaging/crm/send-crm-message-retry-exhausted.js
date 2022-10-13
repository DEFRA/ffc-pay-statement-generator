const sendCrmMessageRetryExhausted = async (statement, filename, trialNo) => {
  console.log(`statement with sbi : ${statement.sbi}, filename : ${filename} could not be sent after ${trialNo} trial(s)`)
}

module.exports = sendCrmMessageRetryExhausted
