'use strict';
const fs = require('node:fs');
const path = require('node:path');
const catalogue = require('../official/catalogue.json');

if (catalogue.schemaVersion !== 2) throw new Error('catalogue schemaVersion must be 2');
if (catalogue.publisher?.id !== 'quikdb' || catalogue.publisher?.verified !== true) throw new Error('verified QuikDB publisher required');
if (catalogue.license !== 'MIT') throw new Error('catalogue license must be MIT');
const ids = new Set();
for (const template of catalogue.templates) {
  if (!/^[a-z0-9-]+$/.test(template.id) || ids.has(template.id)) throw new Error(`invalid template id ${template.id}`);
  ids.add(template.id);
  if (!/^\d+\.\d+\.\d+$/.test(template.version)) throw new Error(`invalid version ${template.id}`);
  if (!template.name || !template.description || !template.runtime) throw new Error(`${template.id} missing identity metadata`);
  if (template.path !== `official/${template.id}`) throw new Error(`${template.id} source path mismatch`);
  const config = template.configuration;
  if (config?.configSource !== 'dockerfile' || config?.buildStrategy !== 'dockerfile' || !config.buildCommand || !config.startCommand) {
    throw new Error(`${template.id} incomplete build and start contract`);
  }
  if (!Number.isInteger(config.port) || config.port !== config.internalPort) throw new Error(`${template.id} invalid port contract`);
  const requirements = template.requirements;
  if (requirements?.customerRepositoryRequired !== false || !Array.isArray(requirements.requiredEnvironmentVariables) || !Array.isArray(requirements.optionalEnvironmentVariables)) {
    throw new Error(`${template.id} incomplete requirements contract`);
  }
  const resources = template.resourceEstimate;
  if (!(resources?.cpuCores > 0 && resources?.ramMb > 0 && resources?.storageMb > 0 && resources?.replicaCount === 1)) throw new Error(`${template.id} invalid resource estimate`);
  if (template.health?.path !== '/health' || !template.health.marker) throw new Error(`${template.id} invalid health contract`);
  if (template.compatibility?.state !== 'compatible' || template.compatibility?.operatingSystem !== 'linux' || !template.compatibility.architectures?.includes('amd64')) {
    throw new Error(`${template.id} incompatible release`);
  }
  if (!Array.isArray(template.features) || !template.features.length || template.support?.status !== 'supported') throw new Error(`${template.id} incomplete support contract`);
  const root = path.join(__dirname, '..', template.path);
  if (!fs.existsSync(path.join(root, 'Dockerfile'))) throw new Error(`${template.id} missing Dockerfile`);
  const source = fs.readdirSync(root, { recursive: true }).filter(Boolean)
    .map(file => { try { return fs.readFileSync(path.join(root, file), 'utf8'); } catch { return ''; } }).join('\n');
  if (!source.includes(template.health.marker)) throw new Error(`${template.id} health marker missing`);
  if (!source.includes(`EXPOSE ${config.port}`)) throw new Error(`${template.id} port mismatch`);
  if (!/HEALTHCHECK/.test(source)) throw new Error(`${template.id} healthcheck missing`);
}
if (ids.size !== 6) throw new Error(`expected six official templates, found ${ids.size}`);
console.log(JSON.stringify({ result: 'passed', schemaVersion: catalogue.schemaVersion, templates: [...ids] }));
