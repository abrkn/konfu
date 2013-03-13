var path = require('path')
, fs = require('fs')
, argv = require('optimist').argv
delete argv.$0
delete argv._

module.exports = {}

function extend(a, b) {
	Object.keys(b).forEach(function(k) {
		a[k] = b[k]
	})
}

function extendFromFileIfExists(fn) {
	if (!fs.existsSync(fn)) return
	extend(module.exports, require(fn))
}

var files = [
	'config.json',
	'config.js',
	'config.' + (process.env.NODE_ENV || 'dev') + '.js',
	'config.' + (process.env.NODE_ENV || 'dev') + '.json',
]

if (process.env.TRAVIS) {
	files.push('config.travis.json')
	files.push('config.travis.js')
}

files.map(path.join.bind(path, process.cwd()))
.forEach(extendFromFileIfExists)

Object.keys(process.env).forEach(function(k) {
	module.exports[k.toLowerCase()] = process.env[k]
})

extend(module.exports, argv)
