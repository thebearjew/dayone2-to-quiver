'use strict'

// Using fs-extra for its directory copy feature
// fs-extra is contains all native fs functions
const fs = require('fs-extra')
const uuid = require('node-uuid')
const converter = require('./converter.js')

module.exports = (dayonePath, quiverPath) => {
  const dayoneContents = fs.readFileSync(dayonePath + '/Journal.json', 'utf8')
  const dayoneData = JSON.parse(dayoneContents)
  const dayonePhotos = fs.readdirSync(dayonePath + '/photos')

  // Creating qvnotebook directory
  const qvnotebookMeta = {
    name: 'Journals',
    uuid: uuid.v4().toUpperCase()
  }
  const mask = parseInt('0755', 8)
  const qvnotebookPath = quiverPath + qvnotebookMeta.uuid + '.qvnotebook'

  // Creating notebook directory
  fs.mkdirSync(qvnotebookPath, mask)
  fs.writeFile(qvnotebookPath + '/meta.json', JSON.stringify(qvnotebookMeta, null, 2), (err) => {
    if (err) throw err
  })

  // Parse each journal entry
  const entries = dayoneData.entries
  let qvnotes = []
  entries.forEach((entry) => {
    converter(entry, qvnotes)
  })

  // Write journal data to quiver note
  qvnotes.forEach((note) => {
    const meta = JSON.stringify(note.meta, null, 2)
    const content = JSON.stringify(note.content, null, 2)
    const resources = note.resources

    const qvnotePath = `${qvnotebookPath}/${uuid.v4().toUpperCase()}.qvnote`

    fs.mkdirSync(qvnotePath, mask)
    fs.writeFile(qvnotePath + '/meta.json', meta, (err) => {
      if (err) throw err
    })

    fs.writeFile(qvnotePath + '/content.json', content, (err) => {
      if (err) throw err
    })

    // TODO: Create resources folder if necessary
    // If the note contains resources, copy them from the photos directory
    if (resources) {
      // Create resources directory
      fs.mkdirSync(`${qvnotePath}/resources`)

      // Find matching images in dayonePhotos
      for (let img of resources) {
        // The current resource was found in the dayonePath/photos directory
        const index = dayonePhotos.indexOf(img)
        if (index > -1) {
          const photoName = dayonePhotos[index]
          fs.copy(`${dayonePath}/photos/${photoName}`, `${qvnotePath}/resources/${photoName}`, (err) => {
            if (err) throw err
          })
        }
      }
    }
  })
}
