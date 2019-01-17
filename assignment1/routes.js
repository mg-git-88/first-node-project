const reqHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if(url === '/') {
        res.write('<html>');
        res.write('<head><title>Welcome!</title></head>');
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Submit</button></form></body>');
        return res.end();
    }
    if(url === '/users' && method === 'GET') {
        res.write('<html>');
        res.write('<head><title>Welcome!</title></head>');
        res.write('<body><p><ul><li>User 1</li><li>User 2</li><li>User 3</li></ul></p></body>');
        return res.end();
    }
    if(url === '/create-user' && method === 'POST') {
        const data = [];

        req.on('data', chunk => {
            data.push(chunk);
        });

        req.on('end', () => {
            const parsedData = Buffer.concat(data).toString();
            const username = parsedData.split('=')[1];
            console.log(username);
            return res.end();
        });
    }
    res.end();
};

module.exports = reqHandler;