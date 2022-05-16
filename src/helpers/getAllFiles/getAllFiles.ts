import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { IFile } from './getAllFiles.d';

dotenv.config();

export const getAllFiles = (dirPath: string, language: string, arrayOfFiles?: IFile[] ): IFile[] => {
  let files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || []
  files.forEach((file) => {
    let finalPath = path.join(dirPath, file);
    if (fs.statSync(finalPath).isDirectory()) {
      arrayOfFiles = getAllFiles(finalPath, language, arrayOfFiles )
    } else {
      finalPath = finalPath.replace('public' + path.sep, '').replace(/\\/g, '/');
      arrayOfFiles!.push({
        url: process.env.BASE_URL + '/' + finalPath,
        path: finalPath.replace(`game/${language}`, '').split('/').filter( (item: string) => item)
      })
    }
  })
  return arrayOfFiles
}
