const getSummaryText = (scheme) => {
  return [
    `\n\nThis statement explains your payment for the ${scheme.name} (${scheme.shortName}). It is made up of 3 parts.`,
    '\nPart 1 provides a summary of the most recent payment.',
    'Part 2 explains how we calculated the payment.',
    'Part 3 highlights were to go for more information.'
  ]
}

module.exports = getSummaryText
