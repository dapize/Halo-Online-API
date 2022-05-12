import { Schema, model } from 'mongoose';
import { IDisk, IHardwareModal, IMonitor, IVideoCard } from './hardware.d';

const diskSchema = new Schema<IDisk>({
  letter: {
    type: String,
    required: true
  },
  type: {
    type: Number,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  free: {
    type: Number,
    required: true
  },
});

const monitorSchema = new Schema<IMonitor>({
  scaleFactor: {
    type: Number,
    required: true
  },
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  }
});

const videoSchema = new Schema<IVideoCard>({
  vram: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

const hardwareSchema = new Schema<IHardwareModal>(
  {
    cpu: {
      type: String,
      required: true
    },
    arc: {
      type: String,
      required: true
    },
    osVersion: {
      type: String,
      required: true
    },
    ram: {
      type: Number,
      required: true
    },
    monitor: {
      type: monitorSchema
    },
    video: {
      type: videoSchema,
      required: true
    },
    disks: {
      type: [diskSchema],
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const hardwareModel = model<IHardwareModal>('hardware', hardwareSchema);
