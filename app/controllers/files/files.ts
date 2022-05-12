import { Request, Response } from "express";
import { Error } from "mongoose";

import { getAllFiles, IFile } from '@helpers/getAllFiles';
import { arrEquals } from "@helpers/arrEquals";
import { handleValidationError } from "@helpers/handleValidationError";
import { filesModel } from "@models/files";

let enFiles: IFile[] = [];
let esFiles: IFile[] = [];

export const getFiles =  async ( req: Request, res: Response) => {
  const query = req.query;
  const language = query.language as string;

  // getting the necessary files
  enFiles = enFiles.length ? enFiles : getAllFiles('./public/game/en', 'en');
  let list = enFiles;
  if ( language === 'es' ) {
    esFiles = esFiles.length ? esFiles : getAllFiles('./public/game/es', 'es');
    list = enFiles.map(( enItem: IFile ) => {
      const findEqualPath = esFiles.find( ( esItem: IFile ) => arrEquals(enItem.path, esItem.path))
      return findEqualPath ? findEqualPath : enItem;
    })
  }

  // registering the getted
  try {
    await filesModel.create({ language });
    res
      .status(200)
      .send({
        list
      })
  } catch ( err: any ) {
    let message = 'something went wrong';
    if (err.name === 'ValidationError') message = handleValidationError(err as Error.ValidationError);
    res.status(400).send({
      message: message
    })
  }
}
