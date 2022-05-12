import express from 'express';

import { regHardware } from '@controllers/hardware';

const router = express.Router();

router.post(
  '/hardware',
  regHardware
)

export { router as routerHardware }
