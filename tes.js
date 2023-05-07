const http = require('http');
const hostname = 'localhost';
const port = 3000;

const { postStock, getStocks, updateStock, deleteStock, getOne, deleteOne } = require("./function.js")

const server = http.createServer((req, res) => {

    const url = req.url;
    const method = req.method;
    if (url === '/stocks') {
        if (method === 'POST') {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk;
            });
            req.on('end', () => {
                postStock(body, (result) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(result));
                })
            })
        }
        if (method == "GET") {
            getStocks((result) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(result));
            })

        }
        if (method === 'PUT') {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk;
            });
            req.on('end', () => {
                updateStock(body, (result) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(result));
                })
            })
        }
        if (method === 'DELETE') {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk;
            });
            req.on('end', () => {
                deleteStock(body, (result) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(result));
                })
            })
        }
    }
    if (url.startsWith('/stocks/')) {
        id = url.split('/')[2];
        id = parseInt(id)
        if (method === 'GET') {
            getOne({ id }, (result) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(result));
            });
        }
        if (method === 'DELETE') {
            deleteOne({ id }, (result) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(result));
            });
        }
    }

});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
