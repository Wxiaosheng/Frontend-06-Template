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

    send(){
        return new Promise((reslove, reject) => {
            // ...
        })
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

    let response = await request()

    console.log(response)
}