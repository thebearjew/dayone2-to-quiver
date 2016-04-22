module.exports = class Journal {
  constructor(data) {
    this.title = data.title
    this.text = data.text
    this.creation_date = data.creation_date
    this.update_date = data.creation_date
  }
}

