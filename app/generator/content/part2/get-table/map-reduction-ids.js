const mapReductionIds = (fundReductions, reductions) => {
  if (!fundReductions || !fundReductions.length) {
    return ''
  }
  return `\n${(fundReductions.map(x => {
    const reduction = reductions.find(y => y.reason === x.reason)
    if (!reduction) {
      return ''
    }
    return `\n(${reduction.id})`
  })).join('')}`
}

module.exports = mapReductionIds
