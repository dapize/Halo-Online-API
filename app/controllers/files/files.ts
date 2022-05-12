import { Request, Response } from "express";
import { getAllFiles, IFile } from '@helpers/getAllFiles';
import { arrEquals } from "@helpers/arrEquals";

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

  res.send({
    list
  })
}
