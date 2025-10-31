const fs = require('fs')
const path = require('path')
const PDFDocument = require('pdfkit')

const docs = [
  'docs/Project_Report.md',
  'docs/SRS_Document.md',
  'docs/User_Manual.md'
]

function mdToPdf(mdPath, outPath) {
  const content = fs.readFileSync(mdPath, 'utf8')
  const doc = new PDFDocument({ autoFirstPage: true, margin: 50 })
  doc.pipe(fs.createWriteStream(outPath))

  // Very simple markdown -> plain text renderer: strip headings and code fences
  const lines = content.split(/\r?\n/)
  lines.forEach(line => {
    // strip markdown headings
    const clean = line.replace(/^#{1,6}\s*/, '')
                      .replace(/\*\*(.*?)\*\*/g, '$1')
                      .replace(/`([^`]+)`/g, '$1')
    doc.font('Times-Roman').fontSize(line.startsWith('#') ? 16 : 11).text(clean, { continued: false })
  })

  doc.end()
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

ensureDir('docs')

docs.forEach(src => {
  const out = src.replace(/\.md$/, '.pdf')
  if (!fs.existsSync(src)) {
    console.warn('Skipping missing file', src)
    return
  }
  mdToPdf(src, out)
  console.log('Wrote', out)
})
