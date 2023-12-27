import { I_Device } from "../../../../interfaces/interfaces";

export interface DeviceCardProps {
  device: I_Full_Device;
}

export interface I_Full_Device extends I_Device {
  brand: { name: string };
  type: { name: string };
}
