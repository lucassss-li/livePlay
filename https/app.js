const https = require('https')
const path = require('path')
const fs = require('fs')

const options = {
	key: fs.readFileSync(
		path.resolve(__dirname, './cert/4478576_lucassss.top.key')
	),
	cert: fs.readFileSync(
		path.resolve(__dirname, './cert/4478576_lucassss.top.pem')
	)
}

https
	.createServer(options, (req, res) => {
		res.writeHead(200)
		res.end(fs.readFileSync(path.resolve(__dirname, './phone.html')))
	})
	.listen(443)
