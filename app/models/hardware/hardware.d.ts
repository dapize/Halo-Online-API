export interface IDisk {
  letter: string;
  type: number;
  size: number;
  free: number;
}

export interface IMonitor {
  scaleFactor: number;
  height: number;
  width: number;
}

export interface IVideoCard {
  vram: number;
  name: string;
}

export interface IHardware {
  cpu: string;
  arc: string;
  disks: IDisk[];
  monitor?: IMonitor;
  osVersion: string;
  ram: number;
  video: IVideoCard;
}

export interface IHardwareModal extends IHardware {
  ip: string;
}
