const http = require('http')

http.createServer((request, response) => {
    console.log('require reslove')
    console.log(request.headers)
    response.setHeader('X-Foo', 'bar')
    // response.setHeader('Content-Type', 'text/html')
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.end(
`<html>
<head>
  <title>Toy Browser</title>
  <style>
    body div #myid {
      width: 100px;
      height: 100px;
      background-color: #ff0055;
    }
    body div img {
      width: 30px;
      height: 30px;
      background-color: #ff1111;
    }
  </style>
</head>
<body>
  <div>
    <img id='myid' />
    <img />
  </div>
</body>
<html>
`
    )
}).listen(8088)

console.log('server started')