const http = require('http');
const url = require('url');

const server = (req,res) =>{

    const param = url.parse(req.url, true);  //true = make 'req.url' possibility 100%
    
    console.log(param);
    console.log(req.method);
    console.log(req.url);
    res.end('Hello');
    
};

http.createServer(server).listen(5000);