import express from 'express';
import { getFiles } from '@controllers/files';
import { files as filesQuery } from '@middlewares/files';

const router = express.Router();

router.get(
  '/files',
  filesQuery(),
  getFiles
);

export { router as routerFiles }
