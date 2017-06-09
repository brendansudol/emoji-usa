const margin = 4
const cellsWide = 12
const cellsHigh = 8
const labelHeight = 12
const cellSize = 64
const cellPad = 10
const cellInner = cellSize - cellPad
const imgPad = 4
const imgSize = cellInner - labelHeight - 2 * imgPad

const metric = 'tfidf'
const width = cellsWide * cellSize + margin
const height = cellsHigh * cellSize + margin

const svg = d3
  .select('#viz')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

d3.json('../../data/state-stats.json', (error, data) => {
  const stateStats = {}
  data.forEach(d => {
    const stats = d.stats
    stateStats[d.id] = {
      cts: stats.top_counts.map(d => d[0]),
      tfidf: stats.top_tfidf.map(d => d[0]),
    }
  })

  const state = svg
    .append('g')
    .attr('transform', `translate(${margin / 2}, ${margin / 2})`)
    .selectAll('.state')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'state')
    .attr(
      'transform',
      d => `translate(${d.grid.x * cellSize}, ${d.grid.y * cellSize})`,
    )

  state
    .append('text')
    .attr('x', cellInner / 2)
    .attr('y', cellInner - 2)
    .style('text-anchor', 'middle')
    .text(d => d.name_short)

  state
    .append('image')
    .attr('x', labelHeight / 2 + imgPad)
    .attr('y', imgPad)
    .attr('width', imgSize)
    .attr('height', imgSize)
    .attr('xlink:href', d => {
      const emoji = stateStats[d.id][metric][0]
      return `../../img/${emoji.replace(/:/g, '').toLowerCase()}.png`
    })
})
