## Covert Day One to Quiver

This is command-line utility to convert [Day One V2](http://dayoneapp.com) journals to [Quiver](http://happenapps.com/#quiver) notebooks.

*Day One* is a personal journaling application on both iOS and OS X which has rich features like adding photos, tags, geo-locations, weather data, fitness data, and other meta data to journals.

*Quiver* is a Mac application which uses Notebooks > Notes > Cells (Text, Markdown, Code, LateX) as the data model. Quiver features a simple and powerful JSON based data structure, which makes it simple to sync using existing cloud services like Dropbox or Google Drive.

Why not bridge these two applications for those who want to use Quiver as their primary note-taking & journaling application.

## Installation

Installation requires [Node v4.0.0 LTS](https://nodejs.org/en/) or greater and Node Package Manager [(npm) v3.7.3](https://www.npmjs.com) or greater.

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
**Quiver**: The data format documentation can be found on [Day One Documentation Wiki -> Data Format](https://github.com/HappenApps/Quiver/wiki/Quiver-Data-Format)

**Day One**: Exports from JSON take the following data structure (Last updated: 2016-05-11)

<small>This is just a sample of an exported Journal.json, some JSON keys are missing for brevity</small>

```js
{
"metadata" : {
  "version" : "1.0"
},
"entries" : [
{
    "tags": [ "Writing", "Self", "Travel"],
    "uuid" : "3033AC461A964C72B187DD0D68C3B74A",
    "weather" : { ... },
    "creationDate" : "2014-02-09T23:36:36Z",
    "text": "Today is February 9th.\n\nToday sparky's, my dog, birthday! ... ",
    "starred" : true,
    "photos" : [
        {
            "cameraMake" : "Apple",
            "fnumber" : "2.4",
            "orderInEntry" : 0,
            "width" : 2100,
            "cameraModel" : "iPhone 5",
            "identifier" : "060632D1C34640459E9A2BD3D02E5BE3",
            "date" : "2014-02-09T00:06:38Z",
            "md5" : "3b77cbcacba09eb9384f3d1aef56b5e0",
            "focalLength" : "4.12"
        }]
}]
}
```


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
