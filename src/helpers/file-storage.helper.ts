import multer, { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

import { PUBLIC_FOLDER } from '@constants/routes.constants';

export const FileStorageHelper = (
  subfolder: string | undefined | null
): multer.StorageEngine => {
  return diskStorage({
    destination: `./${PUBLIC_FOLDER}/${subfolder ?? ''}`,
    filename: (_req, file, cb) => {
      const filename = `${path
        .parse(file.originalname)
        .name.replace(/\s/g, '')}${uuidv4()}`;
      const extension = path.parse(file.originalname).ext.toLocaleLowerCase();

      cb(null, `${filename}${extension}`);
    }
  });
};
