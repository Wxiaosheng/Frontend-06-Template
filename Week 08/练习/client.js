const net = require('net')

class Request {
    constructor(options) {
        this.host = options.host || '127.0.0.1'
        this.port = options.port || 80
        this.method = options.method || "GET"
        this.path = options.path || '/'
        this.headers = options.headers || {}
        this.body = options.body || {}
        
        if (!this.headers['Content-Type']) {
            this.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        }
        if (this.headers['Content-Type'] === 'application/json') {
            this.bodyText = JSON.stringify(this.body)
        } else if (this.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&')
        }

        this.headers['Content-Length'] = this.bodyText.length
    }

    send(connection) {
        return new Promise((reslove, reject) => {
            const parse = new RequestParse
            if (connection) {
                connection.write(this.toString())
            } else {
                connection = net.createConnection({
                    host: this.host,
                    port: this.port
                }, () => {
                    connection.write(this.toString())
                })
            }

            connection.on('data', (data) => {
                console.log(data.toString())
                parse.receive(data.toString())
                if (parse.isFinished) {
                    reslove(parse.response)
                    connection.end()
                }
            })
            connection.on('error', (err) => {
                reject(err)
                connection.end()
            })
        })
    }

    toString() {
        return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}:${this.headers[key]}`).join('\r\n')}\r\n
${this.bodyText}
`
    }
}

class RequestParse {
    constructor(){

    }
    
    receive(string){
        for(let i = 0; i < string.length; i++) {
            this.receiveChar(string.charAt(i))
        }
    }

    // 状态机
    receiveChar(char) {

    }
}

void async function () {
    let request = new Request({
        host: '127.0.0.1',
        port: 8088,
        method: 'POST',
        path: '/',
        headers: {
            ['X-Foo2']: 'customed'
        },
        body: {
            name: 'tianzun'
        }
    })

    const response = await request.send()

    console.log(response)
}()