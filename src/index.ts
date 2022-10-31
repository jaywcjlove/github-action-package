import path from 'path';
import fs from 'fs';
import { setFailed, setOutput, getInput, info, startGroup, endGroup } from '@actions/core';
import removeValue from 'unset-value';

;(async () => {
  try {
    const pkgPath = getInput('path');
    const data = getInput('data');
    const rename = getInput('rename');
    const version = getInput('version');
    const unset = getInput('unset');
    const description = getInput('description');
    const resolvePath = path.resolve(process.cwd(), pkgPath);

    if (!fs.existsSync(resolvePath)) {
      throw new Error(`File \x1b[31;1m${resolvePath}\x1b[0m does not exist!`);
    }

    const jsonStr = await (await fs.promises.readFile(resolvePath)).toString();
    let jsonObj = JSON.parse(jsonStr);
    if (data) {
      const newData = JSON.parse(data);
      jsonObj = Object.assign(jsonObj, newData);
    }
    if (rename) {
      jsonObj = Object.assign(jsonObj, { name: rename });
    }
    if (version) {
      jsonObj = Object.assign(jsonObj, { version });
    }
    if (description) {
      jsonObj = Object.assign(jsonObj, { description });
    }

    if (unset && typeof unset === 'string') {
      unset.split(',').forEach((item) => {
        startGroup(`👉 \x1b[32;1m ${item}\x1b[0m content: `);
          info(`${JSON.stringify(jsonObj, null, 2)}`);
        endGroup();
        removeValue(jsonObj, item.trim())
      });
    }
    await fs.promises.writeFile(resolvePath, JSON.stringify(jsonObj, null, 2));

    startGroup(`\x1b[32;1m package.json\x1b[0m content: `);
    info(`${JSON.stringify(jsonObj, null, 2)}`);
    endGroup();

    Object.keys(jsonObj).forEach((keyname) => {
      const value = jsonObj[keyname];
      if (typeof value === 'string' || typeof value === 'boolean') {
        setOutput(keyname, value);
      } else if (Array.isArray(value)) {
        setOutput(keyname, value.join(','));
      }
    });

    // setOutput('name', jsonObj.name);
    // setOutput('version', jsonObj.version);
    // setOutput('description', jsonObj.description);
    // setOutput('keywords', (jsonObj.keywords || []).join(','));
    // setOutput('license', jsonObj.license);
    // setOutput('homepage', jsonObj.homepage);
    // setOutput('os', (jsonObj.os || []).join(','));

    setOutput('author', (jsonObj.author || {}).name || jsonObj.author);
    setOutput('repository', (jsonObj.repository || {}).url || jsonObj.repository);

  } catch (error) {
    setFailed(error.message);
  }
})();
