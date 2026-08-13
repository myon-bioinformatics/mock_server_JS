const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT || 2250);
const ROOT = __dirname;

const json = (res, statusCode, body) => {
  const payload = JSON.stringify(body);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload),
    'Access-Control-Allow-Origin': '*',
  });
  res.end(payload);
};

const serveStatic = (req, res) => {
  const pathname = req.url === '/' ? '/index.html' : req.url;
  const filePath = path.normalize(path.join(ROOT, pathname));

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }

    res.writeHead(200);
    res.end(data);
  });
};

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
    return;
  }

  if (req.method === 'GET' && req.url === '/api/health') {
    json(res, 200, {
      status: 'ok',
      service: 'mock_server_JS',
    });
    return;
  }

  if (req.method === 'GET' && req.url === '/api/users/1') {
    json(res, 200, {
      id: 1,
      name: 'Mock User',
      email: 'mock.user@example.com',
      role: 'demo',
    });
    return;
  }

  if (req.url.startsWith('/api/')) {
    json(res, 404, {
      error: 'not_found',
      path: req.url,
    });
    return;
  }

  serveStatic(req, res);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Mock server listening on http://0.0.0.0:${PORT}`);
});
