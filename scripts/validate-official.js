'use strict';
const fs = require('node:fs');
const path = require('node:path');
const catalogue = require('../official/catalogue.json');
const ids = new Set();
for (const template of catalogue.templates) {
  if (!/^[a-z0-9-]+$/.test(template.id) || ids.has(template.id)) throw new Error(`invalid template id ${template.id}`);
  ids.add(template.id);
  if (!/^\d+\.\d+\.\d+$/.test(template.version)) throw new Error(`invalid version ${template.id}`);
  const root = path.join(__dirname, '..', template.path);
  for (const file of ['Dockerfile']) if (!fs.existsSync(path.join(root, file))) throw new Error(`${template.id} missing ${file}`);
  const source = fs.readdirSync(root, { recursive: true }).filter(Boolean)
    .map(file => { try { return fs.readFileSync(path.join(root, file), 'utf8'); } catch { return ''; } }).join('\n');
  if (!source.includes(template.healthMarker)) throw new Error(`${template.id} health marker missing`);
  if (!source.includes(`EXPOSE ${template.port}`)) throw new Error(`${template.id} port mismatch`);
  if (!/HEALTHCHECK/.test(source)) throw new Error(`${template.id} healthcheck missing`);
}
console.log(JSON.stringify({ result: 'passed', templates: [...ids] }));
