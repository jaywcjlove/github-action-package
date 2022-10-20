import path from 'path';
import fs from 'fs';
import { setFailed, saveState, getInput, info, startGroup, endGroup } from '@actions/core';

;(async () => {
  try {
    const pkgPath = getInput('path');
    const data = getInput('data');
    const rename = getInput('rename');
    const version = getInput('version');
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
      jsonObj = Object.assign(jsonObj, { name: version });
    }
    if (description) {
      jsonObj = Object.assign(jsonObj, { name: description });
    }
    await fs.promises.writeFile(resolvePath, JSON.stringify(jsonObj, null, 2));

    startGroup(`\x1b[32;1m package.json\x1b[0m content: `);
    info(`${JSON.stringify(jsonObj, null, 2)}`);
    endGroup();

    Object.keys(jsonObj).forEach((keyname) => {
      const value = jsonObj[keyname];
      if (typeof value === 'string' || typeof value === 'boolean') {
        saveState(keyname, value);
      } else if (Array.isArray(value)) {
        saveState(keyname, value.join(','));
      }
    });

    // saveState('name', jsonObj.name);
    // saveState('version', jsonObj.version);
    // saveState('description', jsonObj.description);
    // saveState('keywords', (jsonObj.keywords || []).join(','));
    // saveState('license', jsonObj.license);
    // saveState('homepage', jsonObj.homepage);
    // saveState('os', (jsonObj.os || []).join(','));

    saveState('author', (jsonObj.author || {}).name || jsonObj.author);
    saveState('repository', (jsonObj.repository || {}).url || jsonObj.repository);

  } catch (error) {
    setFailed(error.message);
  }
})();
