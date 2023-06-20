import { readFile } from 'fs/promises';
import * as yaml from 'js-yaml';
import { join } from 'path';

export default async () => {
  const configFilePath = join(process.cwd(), 'config.yaml');

  const config = await readFile(configFilePath);

  return yaml.load(config);
};
