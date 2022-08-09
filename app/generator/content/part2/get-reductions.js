const getReductions = (reductions) => {
  if (!reductions.length) {
    return ['']
  }
  return [
    { text: 'Reason for reductions', style: 'header3' },
    ...getReductionList(reductions)
  ]
}

const getReductionList = (reductions) => {
  const list = []
  reductions.forEach(x => {
    list.push(`(${x.id}) ${x.reason}`)
  })
  return list
}

module.exports = getReductions
