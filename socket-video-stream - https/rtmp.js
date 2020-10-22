const NodeMediaServer = require('node-media-server')
const path = require('path')

const config = {
	rtmp: {
		port: 1935,
		chunk_size: 60000,
		gop_cache: true,
		ping: 30,
		ping_timeout: 60
	},
	https: {
		port: 8000,
		key: path.resolve(__dirname, './cert/4478576_lucassss.top.key'),
		cert: path.resolve(__dirname, './cert/4478576_lucassss.top.pem')
	}
}

var nms = new NodeMediaServer(config)
nms.run()
