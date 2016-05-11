## Covert Day One to Quiver

This is command-line utility to convert [Day One V2](http://dayoneapp.com) journals to [Quiver](http://happenapps.com/#quiver) notebooks.

*Day One* is a personal journaling application on both iOS and OS X which has rich features like adding photos, tags, geo-locations, weather data, fitness data, and other meta data to journals.

*Quiver* is a Mac application which uses Notebooks > Notes > Cells (Text, Markdown, Code, LateX) as the data model. Quiver features a simple and powerful JSON based data structure, which makes it simple to sync using existing cloud services like Dropbox or Google Drive.

Why not bridge these two applications for those who want to use Quiver as their primary note-taking & journaling application.

## Installation

```
npm install convert-dayone
```

## Usage

Run the command `convert-dayone` with two arguments:

- **Path to Day One JSON**: Path to the Day One folder exported by the iOS/Mac app.
    - To export as JSON, open Day One on iOS and go to Settings > Export > As JSON > Send (whatever means you prefer)
    - Day One export directory named in this format: `YYYY-MM-DD-Journal-JSON`
- **Path to Quiver Notebook**: Path to the directory you would like the `.qvnotebook` file to be written. This can be an existing Quiver directory, or any location. When the `.qvnotebook` file is opened, Quiver will prompt to add it.

```
convert-dayone path/to/YYYY-MM-DD-Journal-JSON path/to/save/quiver/
```

## Tests

```
npm test
```

## Data Formats

## Contributing

How to contribute:

1. Fork this repository on Github
2. Clone your fork to your local machine
3. Create a new branch `git checkout -b feature/feature-name`
4. Add / Commit / Repeat
5. Push to your fork  `git push origin master`
6. Create a Pull Request on this repository


## License

[MIT](./LICENSE.md)
