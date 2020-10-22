const NodeMediaServer = require('node-media-server')

const config = {
	rtmp: {
		port: 1935,
		chunk_size: 60000,
		gop_cache: true,
		ping: 30,
		ping_timeout: 60
	},
	http: {
		port: 8000,
		allow_origin: '*'
	}
	// relay: {
	// 	ffmpeg: './ffmpeg/bin/ffmpeg.exe',
	// 	tasks: [
	// 		{
	// 			app: 'hrg',
	// 			mode: 'static',
	// 			edge: 'rtsp://admin:admin123@192.168.10.195:554/h264/1/main/av_stream',
	// 			name: 'test',
	// 			rtsp_transport: 'tcp' //['udp', 'tcp', 'udp_multicast', 'http']
	// 		}
	// 	]
	// }
}

var nms = new NodeMediaServer(config)
nms.run()
