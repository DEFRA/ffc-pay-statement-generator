const mapReductions = (fundings) => {
  const reductions = []
  let i = 1
  fundings.forEach(x => {
    if (x.reductions) {
      x.reductions.forEach(y => {
        if (!reductions.find(z => z.reason === y.reason)) {
          reductions.push({
            id: i,
            reason: y.reason
          })
          i++
        }
      })
    }
  })
  return reductions
}

module.exports = mapReductions
