'use strict'
const uuid = require('node-uuid')

module.exports = (entry, resultsArray) => {
  // Meta object for meta.json of Quiver data format
  let meta = {}
  meta.created_at = Date.parse(entry.creationDate)
  meta.udpated_at = meta.created_at
  meta.tags = entry.tags || []
  meta.uuid = uuid.v4().toUpperCase()
  meta.title = parseTitle(entry.text)

  // Content object for content.json of Quiver data format
  let content = {}
  content.title = parseTitle(entry.text)
  content.cells = []
  const cell = {
    'type': 'markdown',
    'data': parseEntry(entry) || ''
  }
  content.cells.push(cell)

  resultsArray.push({ 'meta': meta, 'content': content })
}

const parseTitle = (text) => {
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

const parseEntry = (entry) => {
  let text = entry.text
  if (text === undefined) { return }

  // String to build regular expression to replace dayone-moment references
  // Ex. dayone-moment://
  const dayoneRef = 'dayone-moment:\/\/'

  const photos = entry.photos
  if (photos) {
    photos.forEach((photo) => {
      // Concatinating 'dayone-moment://' + 'UUID'
      // Ex. 'dayone-moment://UUID'
      const linkSource = dayoneRef + photo.identifier
      const linkReg = new RegExp(linkSource, 'g')

      // Replacement string 'quiver-image-url' + 'MD5' + '.jpg'
      // Ex. 'quiver-image-url/UUID.jpg'
      const newLink = 'quiver-image-url/' + photo.md5.toUpperCase() + '.jpg'

      // Replace all occurances of original link (linkSource) with newLink
      text = text.replace(linkReg, newLink)

      // TODO: Copy image resource to new directory under the quiver
    })
  }
  return text
}

