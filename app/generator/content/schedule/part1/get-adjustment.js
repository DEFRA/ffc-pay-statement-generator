const getAdjustment = (adjustment) => {
  return [
    `Current agreement value: ${adjustment.currentValue}\n`,
    `New agreement value: ${adjustment.newValue}\n`,
    adjustment.adjustmentValue > 0 ? `Top up amount: ${adjustment.adjustmentValue}` : `Reduction amount: ${adjustment.adjustmentValue}`
  ]
}

module.exports = {
  getAdjustment
}
