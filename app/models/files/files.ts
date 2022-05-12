import { IFiles } from './files.d';
import { Schema, model } from 'mongoose';

const filesSchema = new Schema<IFiles>(
  {
    language: {
      type: String,
      enum: ['en', 'es'],
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export const filesModel = model<IFiles>('files', filesSchema);
