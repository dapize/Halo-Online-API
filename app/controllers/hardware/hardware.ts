import { Request, Response } from "express";

export const regHardware = ( req: Request, res: Response ) => {
  const body = req.body;
  console.log(  body )
  res.send()
}
