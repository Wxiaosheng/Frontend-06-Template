const http = require('http')

http.createServer((request, response) => {
  let body = []
  request.on('data', (chunk) => {
    body.push(chunk.toString())
  }).on('end', () => {
    console.log()
    // body = Buffer.concat(body).toString()
    body = (Buffer.concat([Buffer.from(body.toString())])).toString();
    console.log('body: ', body)
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.end(' Hello World!\n')
  }).on('error', (err) => {
    console.log(err)
  })
}).listen(8088)

console.log('serve started')