let httpServer = require('http').Server()
let io = require('socket.io')(httpServer)
const child_process = require('child_process')

io.on('connection', function (socket) {
    //可以在socket连接时以socket地址的query作为房间标识
    //http://127.0.0.1:3000?userId=888 -------->   socket.handshake.query.userId=888
    console.log(socket.handshake.query.userId)
    const ffmpeg = child_process.spawn(
        '../ffmpeg/bin/ffmpeg.exe',
        [
            '-i',
            '-',
            '-vcodec',
            'h264',
            '-acodec',
            'aac',
            '-f',
            'flv',
            `rtmp://192.168.10.10:1935/live/${socket.handshake.query.userId}`
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
        console.log(data)
        ffmpeg.stdin.write(data)
    })
})

httpServer.listen(3000)
