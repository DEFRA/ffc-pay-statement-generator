const mapReductions = (funding) => {
  const reductions = []
  let i = 1
  funding.forEach(x => {
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
