import { NextFunction, Request, Response } from 'express';

export const redirectWwwTraffic = (req: Request, res: Response, next: NextFunction) => {
  if (req?.headers?.host?.slice(0, 4) === "www.") {
    var newHost = req.headers.host.slice(4);
    return res.redirect(301, req.protocol + "://" + newHost + req.originalUrl);
  }
  next();
}
