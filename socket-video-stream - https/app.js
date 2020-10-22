const fs = require('fs')
const path = require('path')
const options = {
	key: fs.readFileSync(
		path.resolve(__dirname, './cert/4478576_lucassss.top.key')
	),
	cert: fs.readFileSync(
		path.resolve(__dirname, './cert/4478576_lucassss.top.pem')
	)
}

const httpServer = require('https').createServer(options)
const child_process = require('child_process')

let io = require('socket.io')(httpServer)
io.on('connection', function (socket) {
	const ffmpeg = child_process.spawn(
		'./ffmpeg/bin/ffmpeg.exe',
		[
			'-i',
			'-',
			'-vcodec',
			'h264',
			'-acodec',
			'aac',
			'-f',
			'flv',
			`rtmp://47.56.153.188:1935/live/${socket.handshake.query.userId}`
		],
		{
			windowsHide: true
		}
	)
	socket.on('disconnect', () => {
		ffmpeg.kill()
	})
	ffmpeg.on('close', (code, signal) => {
		console.log('FFmpeg child process closed')
	})
	socket.on(socket.handshake.query.userId, function (data) {
		ffmpeg.stdin.write(data)
	})
})

httpServer.listen(3000)
