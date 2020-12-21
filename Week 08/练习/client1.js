const net = require('net')

class Request {
    constructor(options) {
        this.host = options.host || '127.0.0.1'
        this.prot = options.port || 80
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

    send() {
        return new Promise((reslove, reject) => {
            // ...
        })
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