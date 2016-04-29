'use strict'
const fs = require('fs')
const uuid = require('node-uuid')
const converter = require('./converter.js')

module.exports = (dayonePath, quiverPath) => {
  const dayoneContents = fs.readFileSync(dayonePath, 'utf8')
  const dayoneData = JSON.parse(dayoneContents)

  const qvnotebookUUID = uuid.v4().toUpperCase() + '.qvnotebook'
  const qvnotebookMask = '0755'

  // Creating qvnotebook directory
  fs.mkdirSync(quiverPath + qvnotebookUUID, parseInt(qvnotebookMask, 8))

  const entries = dayoneData.entries
  // Parse each journal entry
  let qvnotes = []
  entries.forEach((entry) => {
    converter(entry, qvnotes)
  })
}
