var app = require('express')()
var http = require('http').createServer(app)
const io = require('socket.io')(http)
const child_process = require('child_process')

process.env.RTMP_URL = 'rtmp://192.168.10.81:1940/live/test'

app.get('/', function (req, res) {
	res.send("I'm running!")
})

if (!process.env.RTMP_URL) {
	throw 'RMTP_URL not found in env'
}

const ffmpeg = child_process.spawn('ffmpeg', [
	'-i',
    '-',
    '-vcodec',
    'h264',
    '-acodec',
    'aac',
	'-f', 'flv',
	process.env.RTMP_URL
])

ffmpeg.on('close', (code, signal) => {
	console.log(
		'FFmpeg child process closed, code ' + code + ', signal ' + signal
	)
})

ffmpeg.stdin.on('error', e => {
	console.log('FFmpeg STDIN Error', e)
})

ffmpeg.stderr.on('data', data => {
	console.log('FFmpeg STDERR:', data.toString())
})

io.on('connection', function (socket) {
	socket.on('video-chunk', function (data) {
		console.log('Chunk received from browser')
		ffmpeg.stdin.write(data)
	})
})

http.listen(3000, function () {
	console.log('listening on *:3000')
})
