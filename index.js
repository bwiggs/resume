const pug = require('pug')
const helper = require('./assets/helper')
const path = require('path')

const render = (resume) => pug.renderFile(path.join(__dirname, 'assets', 'template.pug'), {
  resume,
  helper
})

const pdfRenderOptions = {
  format: 'A4',
  mediaType: 'print',
  pdfViewport: { width: 1920, height: 1280 },
  margin: {
    top: '0.4in',
    bottom: '0.4in',
    left: '0.4in',
    right: '0.4in'
  }
}

module.exports = {
  render,
  pdfRenderOptions
}
