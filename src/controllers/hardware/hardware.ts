import { Request, Response } from "express";
import { Error } from "mongoose";
import { handleValidationError } from "@helpers/handleValidationError";
import { hardwareModel } from "@models/hardware";

export const regHardware = async ( req: Request, res: Response ) => {
  try {
    await hardwareModel.create({
      ...req.body
    });
    res.status(200).send({
      message: '¡hardware saved successfully!'
    })
  } catch ( err: any ) {
    let message = 'something went wrong';
    if (err.name === 'ValidationError') message = handleValidationError(err as Error.ValidationError);
    res.status(400).send({
      message: message
    })
  }
}
