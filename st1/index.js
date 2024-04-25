const fs = require('fs');
const http = require('http');
const moment = require('moment');

let count = 0;

const server = http.createServer((req, res) => {
    console.log(req.url);

    if (req.url === '/') {
        res.setHeader("Content-type", "home/html");
        const data = fs.readFileSync('./home.html', 'utf-8')
        res.end(data);
    } else if (req.url === '/about') {
        res.setHeader("Content-type", "about/html");
        const data = fs.readFileSync('./about.html', 'utf-8');
        res.end(data);
    } else {
        count++;
        const errorLog = {
            url: req.url,
            dateTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        };

        fs.appendFileSync('error.json', JSON.stringify(errorLog) + '\n');
        res.setHeader("Content-type", "text/html");
        res.write("<h1>This is a response from the server</h1>");
        res.write("<p>404 - Page not found</p>");
        res.write(`<p>Invalid requests count: ${count}</p>`);
        res.end();
    }
});


server.on('/showrequest', (req, res) => {
    
    fs.readFile('error.json', 'utf-8', (err, data) => {
        if (err) {
            res.setHeader("Content-type", "text/plain");
            res.end('Internal Server Error');
            return;
        }

        res.setHeader("Content-type", "application/json");
        res.end(data);
    });
});

server.listen(8080, () => {
    console.log("Server started on port 8080");
});
