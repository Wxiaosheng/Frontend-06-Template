const http = require('http')

http.createServer((request, response) => {
    console.log('require reslove')
    console.log(request.headers)
    response.setHeader('Content-Type', 'text/html')
    response.setHeader('X-Foo', 'bar')
    response.setHeader('Content-Type', 'text/html')
    response.writeHead(200, { 'Content-Type': 'text/plain' })
    response.end(
`<html mate=a >
<head>
    <meta charset="UTF-8">
    <style>
        body div #myid {
            width: 100px;
            background-color: #ff0055;
        }
        body div img {
            width: 30px;
            background-color: #ff1111;
        }
    </style>
    <title>状态机 | 不使用状态机处理字符串</title>
</head>
<body>
    <div>
        <img id='myid' />
        <img />
    </div>
</body>
</html>`
    )
}).listen(8088)

console.log('server started')