#! /usr/bin/env node

const path = require('path')
const builder = require('../src/builder.js')

const args = process.argv.slice(2)
const dayone = args[0]
const quiver = args[1]
const dataPaths = (d, q) => {
  const dayoneJSONPath = path.join(process.cwd(), d)
  const quiverNBPath = path.join(process.cwd(), q)
  builder(dayoneJSONPath, quiverNBPath)
}
dataPaths(dayone, quiver)

