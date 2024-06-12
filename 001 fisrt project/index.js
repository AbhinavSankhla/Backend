const http = require('http');
console.log(http);

http.createServer((req,res) => {
    res.end('hello')
}).listen(4000);