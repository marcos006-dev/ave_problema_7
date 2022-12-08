import path from 'path';
import { fileURLToPath } from 'url';

export const getPath = (urlFile) => {
  const __filename = fileURLToPath(urlFile);
  return path.dirname(__filename);
};
