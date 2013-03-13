var expect = require('expect.js')
, path = require('path')

describe('konfu', function() {
	afterEach(function() {
		delete require.cache[path.join(__dirname, '../index.js')]
	})

	it('lowercases process.env', function() {
		process.env.SOME_SETTING = 'testing'
		var konfu = require('..')
		expect(konfu.some_setting).to.be('testing')
		delete process.env.SOME_SETTING
	})

	it('includes args', function() {
		delete require.cache[path.join(__dirname, '../node_modules/optimist/index.js')]
		process.argv[2] = '--key1=value1'
		var konfu = require('..')
		expect(konfu.key1).to.be('value1')
	})
})
