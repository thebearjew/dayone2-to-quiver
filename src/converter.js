'use strict'
const fs = require('fs')

module.exports = (dayonePath, quiverPath) => {
  const dayoneContents = fs.readFileSync(dayonePath, 'utf8')
  const dayoneData = JSON.parse(dayoneContents)
  //console.log(dayoneData.entries)

  const entries = dayoneData.entries
  entries.forEach((entry) => {
    // TODO: Write parser function to match image links
    // TODO: Generate UUID.v4 for names
    // TODO: Get datefor meta.json
    // TODO: Write data to meta.json
  })
}

const parseTitle = (text) => {
  // If there is no text in the entry, the text is "Untitled"
  if (text === undefined) { return 'Untitled' }

  const paragraphs = text.split('\n\n')

  // Iterate over all of the paragraphs in the journal
  // Paragraphs that aren't image links can be the title
  for (let p of paragraphs) {
    // RegEx check for "![]" Markdown syntax
    // Ignore image links
    if (!(/!\[\]/.test(p)) && p !== '') {
      // Truncate long titles to 60 characters
      if (p.length > 60) {
        return p.substring(0, 60) + '...'
      }

      // Return the paragraph
      return p
    }
  }
  return 'Untitled'
}
