const { app } = require('./src/app')
const { Server } = require('socket.io')
const http = require('http');

const server = http.createServer(app);

const httpServer = server.listen(app.get('port'), (err) => {
	if (err) {
		console.log(`Error startting the server: ${err}`)
	} else {
		console.log(`🚀The server is started on the port: ${app.get('port')}`)
	}
})
//Socket initialization
const io = new Server(httpServer, {
	cors: {
		origin: '*'
	}
})

