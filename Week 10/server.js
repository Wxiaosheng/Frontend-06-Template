const http = require('http')

http.createServer((request, response) => {
  console.log('require reslove')
  console.log(request.headers)
  response.setHeader('X-Foo', 'bar')
  // response.setHeader('Content-Type', 'text/html')
  response.writeHead(200, { 'Content-Type': 'text/html' })
  response.end(
    `<html author=tianzun>
<head>
  <title>Toy Browser</title>
  <style>
    #container {
      width: 500px;
      height: 300px;
      display: flex;
    }
    #container #myid {
      width: 200px;
    }
    #container .c1 {
      flex: 1;
    }
  </style>
</head>
<body>
  <div id='container'>
    <div id='myid' />
    <div class='c1' />
  </div>
</body>
</html>
`
  )
}).listen(8088)

console.log('server started')