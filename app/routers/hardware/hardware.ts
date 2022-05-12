import express from 'express';

import { regHardware } from '@controllers/hardware';
import { hardware as hardwareBody } from '@middlewares/hardware';

const router = express.Router();

router.post(
  '/hardware',
  hardwareBody(),
  regHardware
)

export { router as routerHardware }
