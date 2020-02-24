const fs = require('fs');

const requestHandler = (req,res) => {
    // console.log(req);
        // console.log(req.url,req.method,req.headers);
        const url = req.url;
        const method = req.method;
        if(url === '/'){
            res.write('<html>');
            res.write('<head><title>Enter a message</title></head>');
            res.write(
                '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Submit</buttton></form>'
            )
            res.write('</html>');
            return res.end();
        }
        if(url === '/message' && method === 'POST'){
            const body = [];
            req.on('data',chunk => {
                console.log(chunk);
                body.push(chunk);
            });
            return req.on('end',()=>{
                const parsedBody = Buffer.concat(body).toString();
                const message = parsedBody.split('=')[1];
                fs.writeFile('message.txt',message,err=>{
                    res.statusCode=302;
                    res.setHeader('Location','/');
                    return res.end();
                });
            });
        }
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head>');
        res.write('<title>My first page from NodeJS server</title>');
        res.write('</head>');
        res.write('<body><h1>Hello there</h1></body>')
        res.write('</html>');
        res.end();
};

// module.exports = requestHandler;

// module.exports = {
//     handler = requestHandler;
//     someText = 'Some hard coded text'
// };

// module.exports.handler = requestHandler;
// module.exports.someText = 'Some hard coded text';

exports.handler = requestHandler;
exports.someText = 'Some hard coded text';