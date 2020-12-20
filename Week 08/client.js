const net = require('net')

class Request {
    constructor(options) {
        this.methond = options.methond || 'GET'
        this.host = options.host
        this.prot = options.prot || 80
        this.path = options.path || '/'
        this.body = options.body || {}
        this.headers = options.headers || {}
        if (!this.headers['Content-Type']) {
            this.headers['Content-Type'] = 'application/x-www-form-urlencode'
        }
        if (this.headers['Content-Type'] === 'application/json') {
            this.bodyText = JSON.stringify(this.body)
        } else if (this.headers['Content-Type'] === 'application/x-wwww-form-urlencode') {
            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.bodyText[key])}`).join('&')
        }
        this.headers['Content-Length'] = this.bodyText.length
    }

    toString () {
        return `${this.options.methond} ${this.options.path} HTTP/1.1\r
        ${Object.keys(this.headers).map(key => `${key}=${this.headers(key)}`).join('\r\n')}\r\n
        ${this.bodyText}
        `
    }

    send(connection){
        return new Promise((reslove, reject) => {
            const parse = new ResponseParse
            if (connection) {
                connection.write(this.toString())
            } else {
                connection = net.createConnection({
                    host: this.host,
                    port: this.prot
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
}

class ResponseParse {
    constructor(){
        this.WAITING_STAUS_LINE = 0
        this.WAITING_STAUS_LINE_END = 1
        this.WAITING_HEADER_NAME = 2
        this.WAITING_HEADER_SPACE = 3
        this.WAITING_HEADER_VALUE = 4
        this.WAITING_HEADER_LINE_END = 5
        this.WAITING_HEADER_BLACK_END = 6
        this.WAITING_BODY = 7

        this.current = this.WAITING_STAUS_LINE
        this.statusLine = ''
        this.headers = {}
        this.headerName = ''
        this.headerValue = ''
        this.bodyParse = null
    }

    // 状态机 循环处理
    receive (string) {
        for (let i = 0; i < string.length; i++) {
            this.receive(string.charAt(i))
        }
    }

    receiveChar(char){
        if (this.current === this.WAITING_STAUS_LINE) {
            if (char === '\r') {
                this.current = WAITING_STAUS_LINE_END
            } else {
                this.statusLine += char
            } 
        } else if (this.current === this.WAITING_STAUS_LINE_END) {
            if (char === '\n') {
                this.current = this.WAITING_HEADER_NAME
            }
        } else if (this.current === this.WAITING_HEADER_NAME) {
            if (char === ':') {
                this.current = this.WAITING_HEADER_SPACE
            } else if (char === '\r') {
                this.current = this.WAITING_HEADER_BLACK_END
            } else {
                this.headerName += char
            }
        } else if (this.current === this.WAITING_HEADER_SPACE) {
            if (char === ' ') {
                this.current = this.WAITING_HEADER_VALUE
            }
        } else if (this.current === this.WAITING_HEADER_VALUE) {
            if (char === '\r') {
                this.current = this.WAITING_HEADER_LINE_END
                this.headers[this.headerName] = this.headerValue
                this.headerName = ''
                this.headerValue = ''
            } else {
                this.headerValue += char
            }
        } else if (this.current === this.WAITING_HEADER_LINE_END) {
            if (char === '\n') {
                this.current = this.WAITING_HEADER_NAME
            }
        } else if (this.current === this.WAITING_HEADER_BLACK_END) {
            if (char === '\n') {
                this.current = this.WAITING_BODY
            }
        } else if (this.current === this.WAITING_BODY) {
            console.log(char)
        }
    }
}

void async function () {
    let request = new Request({
        methond: 'POST',
        host: '127.0.0.1',
        port: 8088,
        path: '/',
        headers: {
            ['X-Foo2']: 'customed'
        },
        body: {
            name: 'tianzun'
        }
    })

    debugger
    let response = await request.send()

    console.log(response)
}()