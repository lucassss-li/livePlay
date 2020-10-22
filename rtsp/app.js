let httpServer = require('http').Server()
let io = require('socket.io')(httpServer)
const child_process = require('child_process')

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
			`rtmp://192.168.10.81:1935/live/${socket.handshake.query.userId}`
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