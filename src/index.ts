import path from 'path';
import fs from 'fs';
import { setFailed, setOutput, getInput, info, startGroup, endGroup } from '@actions/core';

;(async () => {
  try {
    const pkgPath = getInput('path');
    const data = getInput('data');
    const resolvePath = path.resolve(process.cwd(), pkgPath);

    if (!fs.existsSync(resolvePath)) {
      throw new Error(`File \x1b[31;1m${resolvePath}\x1b[0m does not exist!`);
    }

    const jsonStr = await (await fs.promises.readFile(resolvePath)).toString();
    let jsonObj = JSON.parse(jsonStr);
    if (data) {
      const newData = JSON.parse(data);
      jsonObj = Object.assign(jsonObj, newData);
      await fs.promises.writeFile(resolvePath, JSON.stringify(jsonObj, null, 2));
    }

    startGroup(`\x1b[32;1m package.json\x1b[0m content: `);
    info(`${JSON.stringify(jsonObj, null, 2)}`);
    endGroup();

    setOutput('name', jsonObj.name);
    setOutput('version', jsonObj.version);
    setOutput('description', jsonObj.description);
    setOutput('author', (jsonObj.author || {}).name || jsonObj.author);
    setOutput('keywords', (jsonObj.keywords || []).join(','));
    setOutput('license', jsonObj.license);
    setOutput('homepage', jsonObj.homepage);
    setOutput('repository', (jsonObj.repository || {}).url || jsonObj.repository);
    setOutput('os', (jsonObj.os || []).join(','));

  } catch (error) {
    setFailed(error.message);
  }
})();
