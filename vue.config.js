const fs = require('fs')
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
	transpileDependencies: true,
	devServer: {
		https: {
			key: fs.readFileSync('./key.pem'),
			cert: fs.readFileSync('./cert.pem'),
		},
		host: 'localhost',
		port: 8080,
	},
})
