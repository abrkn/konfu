var path = require('path')
, fs = require('fs')
, argv = require('optimist').argv

var konfu = module.exports = {}

function extend(source, overwriteOnly) {
	Object.keys(source).forEach(function(key) {
		if (overwriteOnly && !konfu.hasOwnProperty(key)) return
		konfu[key] = source[key]
	})
}

var exists = fs.existsSync || path.existsSync

function extendFromFileIfExists(fn) {
	if (!exists(fn)) return
	extend(require(fn))
}

var env = process.env.NODE_ENV || 'dev'
, files = [
    'config.json',
    'config.js',
    'config/index.js',
    'config.' + env + '.js',
    'config.' + env + '.json',
    'config/' + env + '.js',
    'config/' + env + '.json',
]

if (process.env.TRAVIS) {
	files.push('config.travis.json')
	files.push('config.travis.js')
	files.push('config/travis.json')
	files.push('config/travis.json')
}

files.map(function(f) {
    return path.join(process.cwd(), f)
})
.forEach(extendFromFileIfExists)

Object.keys(process.env).forEach(function(key) {
	var keyLower = key.toLowerCase()
    var casedKey = Object.keys(konfu).filter(function(k) {
        return k.toLowerCase() === keyLower
    })[0]
    if (!casedKey) return
    konfu[casedKey] = process.env[key]
})

extend(argv, true)
