const fs   = require('fs');
const path = require('path');
const yaml = require('js-yaml');

try {
  const src = path.resolve('./openapi.yaml');
  const dest = path.resolve('./src/generated/openapi.json');

  console.info('Reading...', src);
  const specObj = yaml.load(fs.readFileSync(src, 'utf8'));
  const jsonStr = JSON.stringify(specObj, null, 2);

  console.info('Writing...', dest);
  fs.writeFileSync(dest, jsonStr);
  console.info('Done!');
} catch (err) {
  console.error('ERROR');
  console.error(err);
  console.error('');
}
