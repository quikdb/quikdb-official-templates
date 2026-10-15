'use strict';
const express = require('express');
const app = express();
const port = Number(process.env.PORT || 3000);
app.disable('x-powered-by');
app.get('/health', (_req, res) => res.json({ ok: true, marker: 'quikdb-template-express-api-v1' }));
app.get('/', (_req, res) => res.json({ message: 'Your QuikDB Express API is live.' }));
app.listen(port, '0.0.0.0', () => console.log(`Express template listening on ${port}`));
