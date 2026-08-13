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

const readJsonBody = (req) => new Promise((resolve, reject) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    if (!body) {
      resolve({});
      return;
    }
    try {
      resolve(JSON.parse(body));
    } catch (error) {
      reject(error);
    }
  });
  req.on('error', reject);
});

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

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
    return;
  }

  if (req.method === 'GET' && req.url === '/api/health') {
    json(res, 200, { status: 'ok', service: 'mock_server_JS' });
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

  if (req.method === 'POST' && req.url === '/api/echo') {
    try {
      const body = await readJsonBody(req);
      json(res, 200, { received: body, method: 'POST' });
    } catch (_) {
      json(res, 400, { error: 'invalid_json' });
    }
    return;
  }

  if (req.method === 'GET' && req.url === '/api/timeout') {
    setTimeout(() => {
      json(res, 200, { status: 'completed_after_delay', delayMs: 2500 });
    }, 2500);
    return;
  }

  if (req.method === 'GET' && req.url === '/api/unauthorized') {
    json(res, 401, { error: 'unauthorized', message: 'Mock authentication required.' });
    return;
  }

  if (req.method === 'GET' && req.url === '/api/server-error') {
    json(res, 500, { error: 'server_error', message: 'Intentional mock failure.' });
    return;
  }

  if (req.method === 'GET' && req.url === '/mcp/tools') {
    json(res, 200, {
      tools: [
        {
          name: 'weather_lookup',
          description: 'Return mock weather for a city.',
          inputSchema: {
            type: 'object',
            properties: { city: { type: 'string' } },
            required: ['city'],
          },
        },
      ],
    });
    return;
  }

  if (req.method === 'POST' && req.url === '/mcp/call') {
    let body;
    try {
      body = await readJsonBody(req);
    } catch (_) {
      json(res, 400, { error: 'malformed_arguments', message: 'Request body must be valid JSON.' });
      return;
    }

    if (body.name !== 'weather_lookup') {
      json(res, 404, { error: 'tool_not_found', tool: body.name ?? null });
      return;
    }

    if (!body.arguments || typeof body.arguments.city !== 'string' || !body.arguments.city.trim()) {
      json(res, 400, {
        error: 'malformed_arguments',
        message: '`arguments.city` must be a non-empty string.',
      });
      return;
    }

    if (body.arguments.city === '__tool_error__') {
      json(res, 500, {
        error: 'tool_error',
        tool: 'weather_lookup',
        message: 'Intentional mock tool failure.',
      });
      return;
    }

    json(res, 200, {
      tool: 'weather_lookup',
      isError: false,
      content: [{ type: 'text', text: `Mock weather for ${body.arguments.city}: sunny, 24°C` }],
    });
    return;
  }

  if (req.url.startsWith('/api/') || req.url.startsWith('/mcp/')) {
    json(res, 404, { error: 'not_found', path: req.url });
    return;
  }

  serveStatic(req, res);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Mock server listening on http://0.0.0.0:${PORT}`);
});
