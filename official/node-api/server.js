'use strict';
const http = require('node:http');
const port = Number(process.env.PORT || 3000);
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (req.url === '/health') return res.end(JSON.stringify({ ok: true, marker: 'quikdb-template-node-api-v1' }));
  res.end(JSON.stringify({ message: 'Your QuikDB Node.js API is live.' }));
});
server.listen(port, '0.0.0.0', () => console.log(`Node template listening on ${port}`));
