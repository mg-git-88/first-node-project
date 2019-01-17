const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // console.log(req.url, req.method, req.headers);
  // process.exit();
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const data = [];

    req.on("data", chunk => {
      console.log(chunk);
      data.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(data).toString();
      const userMessage = parsedBody.split("=")[1];
      fs.writeFileSync("message.txt", userMessage);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First NodeJS App!</title></head>");
  res.write("<body><p>Hi, this is my first NodeJS application!</p></body>");
  res.write("</html>");
  res.end();
});

server.listen(1988);
