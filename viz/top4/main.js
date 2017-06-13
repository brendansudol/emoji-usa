const cellsWide = 12
const cellsHigh = 8
const labelHeight = 14
const cellSize = 62
const cellPad = 8
const cellInner = cellSize - cellPad
const imgSize = (cellInner - labelHeight) / 2
const imgPad = 1
const imgInner = imgSize - 2 * imgPad
const margin = { top: 20, right: 2, bottom: 12, left: 2 }

const metric = 'tfidf'
const width = cellsWide * cellSize + margin.left + margin.right
const height = cellsHigh * cellSize + margin.top + margin.bottom

const svg = d3
  .select('#viz')
  .append('svg')
  .attr('class', 'mx-auto')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', `translate(${margin.left + cellPad / 2}, ${margin.top})`)

d3.json('../../data/state-stats.json', (error, data) => {
  const stateStats = {}
  data.forEach(d => {
    const stats = d.stats
    stateStats[d.id] = {
      cts: stats.top_counts.map(d => d[0]),
      tfidf: stats.top_tfidf.map(d => d[0])
    }
  })

  const state = svg
    .selectAll('.state')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'state')
    .attr(
      'transform',
      d => `translate(${d.grid.x * cellSize}, ${d.grid.y * cellSize})`
    )

  state
    .append('text')
    .attr('x', cellInner / 2)
    .attr('y', cellInner - 2)
    .style('text-anchor', 'middle')
    .style('font-size', 10)
    .text(d => d.name_short)

  const group = state
    .append('g')
    .attr('transform', `translate(${labelHeight / 2}, 0)`)

  const emoji = group
    .selectAll('.emoji')
    .data(d => stateStats[d.id][metric].slice(0, 4))
    .enter()
    .append('g')
    .attr('class', 'emoji')
    .attr(
      'transform',
      (_, i) =>
        `translate(${i % 2 === 0 ? 0 : imgSize}, ${i < 2 ? 0 : imgSize})`
    )

  emoji
    .append('image')
    .attr('x', imgPad)
    .attr('y', imgPad)
    .attr('width', imgInner)
    .attr('height', imgInner)
    .attr(
      'xlink:href',
      d => `../../img/${d.replace(/:/g, '').toLowerCase()}.png`
    )
})
