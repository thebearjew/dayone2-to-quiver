'use strict'
const fs = require('fs')
const uuid = require('node-uuid')

module.exports = (dayonePath, quiverPath) => {
  const dayoneContents = fs.readFileSync(dayonePath, 'utf8')
  const dayoneData = JSON.parse(dayoneContents)
  // console.log(dayoneData.entries)

  const entries = dayoneData.entries

  entries.forEach(buildQuiverData)
}

const buildQuiverData = (entry) => {
  // Meta object for meta.json of Quiver data format
  let meta = {}
  meta.created_at = Date.parse(entry.creationDate)
  meta.udpated_at = meta.created_at
  meta.tags = entry.tags || []
  meta.uuid = uuid.v4().toUpperCase()
  meta.title = parseTitle(entry.text)
  // console.log('Meta: ', meta)

  // Content object for content.json of Quiver data format
  let content = {}
  content.title = parseTitle(entry.text)
  content.cells = []
  const cell = {
    'type': 'markdown',
    'data': ''
  }
  parseEntry(entry.text)
  content.cells.push(cell)
  // console.log('Content:', content)

  // TODO: Write parser function to match image links
  // TODO: Generate UUID.v4 for names
  // TODO: Write data to meta.json
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
      // Truncate long titles to 60 characters for style
      if (p.length > 60) {
        return p.substring(0, 60) + '...'
      }
      // Return the paragraph
      return p
    }
  }
  return 'Untitled'
}

const parseEntry = (text) => {
  if (text === undefined) { return }

  const linkRegexG = /(!\[\])(\(dayone-moment:\/\/([a-zA-z0-9]+)\))/g
  const linkRegex = /(!\[\])(\(dayone-moment:\/\/([a-zA-z0-9]+)\))/

  const paragraphs = text.split('\n\n')
  for (let p of paragraphs) {
    const matches = p.match(linkRegexG)
    if (matches) {
      matches.forEach((match) => {
        console.log(linkRegex.exec(match)[3])
      })
    }
  }
}

// TODO: Write function to move image resources and relink markdown
